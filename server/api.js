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
const Request = require("./models/request");

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
  // not logged in
  if (!req.user) return res.send({});

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

router.get('/getTrack', (req, res) => {
  console.log(req.query.trackId)
  spotifyApi.getTrack(req.query.trackId)
    .then(function (data) {
      console.log('Response', data.body);
      res.send(data.body)
    }, function (err) {
      console.log('Something went wrong!', err);
    });
})

processTrack = (trackInfo) => {
  return trackInfoProcessed = {
    _id: trackInfo.id,
    name: trackInfo.name,
    artists: trackInfo.artists.map((artistInfo) => artistInfo.name),
    album: trackInfo.album.name,
    images: trackInfo.album.images,
    url: trackInfo.external_urls.spotify,
    preview_url: trackInfo.preview_url
  };
}

router.get('/getTrackProcessed', (req, res) => {
  spotifyApi.getTrack(req.query.trackId)
    .then(function (data) {
      const trackInfo = data.body
      console.log('Response', trackInfo);
      res.send(processTrack(trackInfo))
    }, function (err) {
      console.log('Something went wrong!', err);
    });
})

router.get("/getMyDeck", (req, res) => {
  // do nothing if user not logged in
  if (req.user) {
    User.findById(req.user._id).then((user) => res.send(user.deck));
  }
})

router.get("/getMyDeckProcessed", (req, res) => {
  // do nothing if user not logged in
  if (req.user) {
    User.findById(req.user._id).then((user) => {
      const deckPromises = user.deck.map((trackId) => spotifyApi.getTrack(trackId));

      Promise.all(deckPromises).then((allResults) => {
        const deckProcessed = allResults.map((data) => processTrack(data.body));
        res.send(deckProcessed);
      });
    });
  }
})


router.get("/getMyTopTracks", (req, res) => {
  console.log("GET req to get top", req.query.limit, "tracks received");
  spotifyApi.getMyTopTracks({ limit: req.query.limit })
  .then(function(data) {
    let topTracks = data.body.items;
    res.send(topTracks.map((track) => {return track.id}));
  }, function(err) {
    console.log('Something went wrong!', err);
  });
})

router.post("/addToMyDeck", (req, res) => {
  if (req.user) {
    console.log("POST req to update deck received")
    console.log(req.body.tracks)
    User.findById(req.user._id).then((user) => {
      console.log(user);
      user.deck = user.deck.concat(req.body.tracks);
      user.save();
      res.send(user.deck);
    });
  }
})

router.get("/getRequestFeed", (req, res) => {
  Request.find({}).then((stories) => res.send(stories));
})

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
