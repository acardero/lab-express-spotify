const express = require('express');
const router  = express.Router();
const SpotifyWebApi= require('spotify-web-api-node');


  // Remember to paste your credentials here
  const clientId = '5798d4b8318c4e0887361f8acadb9ea4',
      clientSecret = '6e8debe8a0934f50aaab63a1601bd1cc';
  
  const spotifyApi = new SpotifyWebApi({
    clientId : clientId,
    clientSecret : clientSecret
  });
  
  // Retrieve an access token.
  spotifyApi.clientCredentialsGrant()
    .then(function(data) {
      spotifyApi.setAccessToken(data.body['access_token']);
    }, function(err) {
      console.log('Something went wrong when retrieving an access token', err);
  });

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('homepage', {"hi":"hello"});
});

router.get('/artists', (req, res,next)=>{
  spotifyApi.searchArtists(req.query.artist)
    .then(data => {
      const artists = data.body.artists.items;
      console.log(artists);
      res.render('artists', {artists});
    })
    .catch(err => {
      res.send("CRASH!!!!" + err);
    })
})

module.exports = router;
