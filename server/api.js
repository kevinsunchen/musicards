/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socket = require("./server-socket");


// documentation here https://www.npmjs.com/package/spotify-web-api-node
const SpotifyWebApi = require('spotify-web-api-node');
scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private', 'user-library-read', 'user-top-read']

// TODO: create an account at https://developer.spotify.com/dashboard/ 
// fill in your spotify developer information in .env
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_API_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.CALLBACK_URI,
});

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.get('/spotifyLogin', (req, res) => {
  auth.spotifyLogin(req, res, spotifyApi)
})
router.get('/callback', async (req, res) => {
  auth.callback(req, res, spotifyApi)
});

router.get('/playlists', async (req, res) => {
  try {
    const result = await spotifyApi.getUserPlaylists();
    console.log(result.body);
    console.log(req.session.user)
    console.log(req.user)
    res.status(200).send(result.body);
  } catch (err) {
    res.status(400).send(err)
  }
});

router.get('/getMe', (req, res) => {
  spotifyApi.getMe()
    .then(function (data) {
      console.log('Some information about the authenticated user', data.body);
      res.send(data)
    }, function (err) {
      console.log('Something went wrong!', err);
    });
})

router.get('/getUser', (req, res) => {
  spotifyApi.getUser(req.query.spotifyId)
    .then(function (data) {
      console.log('Some information about this authenticated user', data.body);
      res.send(data)
    }, function (err) {
      console.log('Something went wrong!', err);
    });
})

router.post("/logout", (req, res) => { auth.logout(req, res, spotifyApi) });

router.get("/whoami", (req, res) => {
  // console.log(req)
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socket.addUser(req.user, socket.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/getUserDeck", (req, res) => {
  // do nothing if user not logged in
  User.findById(req.query.userid).then((user) => {
    res.send(user.deck);
  });
})

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
