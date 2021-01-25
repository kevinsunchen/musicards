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
const Trade = require("./models/trade");

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
console.log("Starting server")
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_API_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.CALLBACK_URI,
});

const getClientCredentials = async () => {
  console.log("Getting new client credentials...")
  await spotifyApi.clientCredentialsGrant().then(
    function(data) {
      console.log("Client credentials received");
      // console.log('The access token expires in ' + data.body['expires_in']);
      // console.log('The access token is ' + data.body['access_token']);
  
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
  );
}

const runWithClientCredentials = async (apiFunc, apiInput, processResponseFunc) => {
  let data = null;
  try {
    // console.log("Attempting to run API function", apiFunc, "with input", apiInput);
    data = await apiFunc(apiInput);
    // console.log("API function ran successfully.")
  } catch(err) {
    //console.log("Something went wrong!");
    if (err.statusCode === 401) {
      console.log("401 Unauthorized Error. Attempting to remedy by requesting new client credentials");
      await getClientCredentials();
      data = await apiFunc(apiInput);
    }
    else { return err; }
  }
  return processResponseFunc(data);
}

const refreshAccessToken = async (user) => {
  try {
    const data = await spotifyApi.refreshAccessToken();
    console.log('The access token has been refreshed!');
    // Save the access token so that it's used in future calls
    const accessToken = data.body['access_token']
    spotifyApi.setAccessToken(accessToken);
    existingUser = await User.findOne({ spotifyId: user.spotifyId });
    existingUser.accessToken = accessToken;
    return await existingUser.save();
  } catch (err) {
    console.log('Could not refresh access token', err);
  }
}

const getLoggedInSpotifyApi = (accessToken) => {
  const loggedInSpotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_API_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.CALLBACK_URI,
  });
  loggedInSpotifyApi.setAccessToken(accessToken);
  return loggedInSpotifyApi;
}

const runWithLoggedInSpotifyApi = async (req, res, funcWrapper, retriesLeft) => {
  console.log(retriesLeft);
  if (retriesLeft < 0) {
    console.log("Retry limit exceeded");
    throw new Error(418);
  }
  const loggedInSpotifyApi = getLoggedInSpotifyApi(req.user.accessToken);
  try {
    return await funcWrapper(loggedInSpotifyApi);
  } catch (err) {
    console.log(err);
    req.user = await refreshAccessToken(req.user);
    return await runWithLoggedInSpotifyApi(req, res, funcWrapper, retriesLeft-1);
    // res.status(401).send(err);
  }
}

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.get('/spotifyLogin', (req, res) => {
  auth.spotifyLogin(req, res, spotifyApi);
})
router.get('/callback', async (req, res) => {
  auth.callback(req, res, spotifyApi);
});

router.get('/playlists', async (req, res) => {
  try {
    const loggedInSpotifyApi = getLoggedInSpotifyApi(req.user.accessToken);
    const result = await loggedInSpotifyApi.getUserPlaylists();
    res.send(result);
  } catch (err) {
    res.status(400).send(err)
  }
});

router.get('/getMe', (req, res) => {
  const loggedInSpotifyApi = getLoggedInSpotifyApi(req.user.accessToken);
  loggedInSpotifyApi.getMe()
    .then(function (data) {
      console.log('Some information about the authenticated user', data.body);
      res.send(data)
    }, function (err) {
      console.log('Something went wrong!', err);
    });
})

router.get('/getUser', (req, res) => {
  const loggedInSpotifyApi = getLoggedInSpotifyApi(req.user.accessToken);
  loggedInSpotifyApi.getUser(req.query.spotifyId)
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

const processTrack = (trackInfo) => {
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

router.get('/getTrack', (req, res) => {
  console.log(req.query.trackId)
  try {
    spotifyApi.getTrack(req.query.trackId)
      .then(function (data) {
        // console.log('Response', data.body);
        res.send(data.body)
      }, function (err) {
        console.log('Something went wrong!', err);
      });
  } catch {
    console.log("5035053053")
  }
})

const getTrackProcessed = async (trackId) => {
  const getTrackApiWrapper = async (inp) => await spotifyApi.getTrack(inp);
  const inputToApiWrapper = trackId;
  const processResponseFunc = (data) => (processTrack(data.body));
  const result = await runWithClientCredentials(getTrackApiWrapper, inputToApiWrapper, processResponseFunc);
  return result;
}

router.get('/getTrackProcessed', async (req, res) => {
  const result = await getTrackProcessed(req.query.trackId);
  res.send(result)
});

/**
router.get('/getTrackProcessed', (req, res) => {
  spotifyApi.getTrack(req.query.trackId)
    .then((data) => {
      const trackInfo = data.body
      // console.log('Response', trackInfo);
      res.send(processTrack(trackInfo))
    }).catch((err) => {
      console.log("503 time")
      console.log('Something went wrong!', err);
    });
})
 */

router.get("/getMyDeck", (req, res) => {
  // do nothing if user not logged in
  if (req.user) {
    User.findById(req.user._id).then((user) => res.send(user.deck));
  }
})

router.get("/getMyDeckProcessed", async (req, res) => {
  // do nothing if user not logged in
  if (req.user) {
    let user = await User.findById(req.user._id);
    const deckPromises = user.deck.map((trackId) => {
      return runWithLoggedInSpotifyApi(req, res, (loggedInSpotifyApi) => loggedInSpotifyApi.getTrack(trackId), 10);
    });

    let allResults = await Promise.all(deckPromises)
    const deckProcessed = allResults.map((data) => processTrack(data.body));
    res.send(deckProcessed);
  }
})

router.post("/addToMyDeck", auth.ensureLoggedIn, async (req, res) => {
  console.log("POST req to update deck received")
  console.log(req.body.tracks)
  let user = await User.findById(req.user._id);
  console.log(user);
  user.deck = [...new Set(user.deck.concat(req.body.tracks))];
  user.save();
  res.send(user.deck);
})

router.get("/getMyTopTracks", async (req, res) => {
  console.log("GET req to get top", req.query.limit, "tracks received");
  if (req.user) {
    try {
      const data = await runWithLoggedInSpotifyApi(req, res, (loggedInSpotifyApi) => loggedInSpotifyApi.getMyTopTracks({ limit: req.query.limit }), 10);
      const topTracks = data.body.items;
      res.send(topTracks.map((track) => {return track.id}));
    } catch (err) {
      console.log('Something went wrong!', err);
    }
  }
})

router.get("/getRequestFeed", (req, res) => {
  Request.find({}).then((stories) => res.send(stories));
})

router.post("/postToRequestFeed", auth.ensureLoggedIn, (req, res) => {
  console.log(req.body, req.user);
  const newRequest = new Request({
    creator_id: req.user._id,
    creator_name: req.user.name,
    offeredTrackId: req.body.offeredTrackId,
    offeredLabel: req.body.offeredLabel,
    requestedLabel: req.body.requestedLabel
  });

  newRequest.save().then((request) => res.send(request));
})

router.post("/performTrade", auth.ensureLoggedIn, async (req, res) => {
  const user = await User.findById(req.user._id);
  const tradeInfo = req.body;
  try {
    const targetRequest = await Request.findById(tradeInfo.requestId);
    console.log(tradeInfo, user, targetRequest);
    if (!targetRequest) 
      res.status(400).send({ msg: "The trade could not be performed as the request has already been claimed!" });
    else if ((tradeInfo.requesterId === user._id) || (tradeInfo.requesterTrackId === tradeInfo.fulfillerTrackId))
      res.status(400).send({ msg: "Something is wrong with this trade!" });
    else {
      console.log("Here");
      const newTrade = new Trade({
        requesterName: tradeInfo.requesterName,
        requesterId: tradeInfo.requesterId,
        requesterLabel: tradeInfo.requesterLabel,
        requesterTrackId: tradeInfo.requesterTrackId,
        fulfillerName: user.name,
        fulfillerId: user._id,
        fulfillerLabel: tradeInfo.fulfillerLabel,
        fulfillerTrackId: tradeInfo.fulfillerTrackId
      });
      const trade = await newTrade.save();
      console.log("Trade:", trade);
      
      let requester = await User.findById(trade.requesterId);
      let fulfiller = user;
      
      console.log("R:", requester, "F:", fulfiller);
      
      // requester.deck = requester.deck.filter((track) => track !== trade.requesterTrackId);
      // fulfiller.deck = fulfiller.deck.filter((track) => track !== trade.fulfillerTrackId);
      fulfiller.deck.push(trade.requesterTrackId);
      fulfiller.deck = [...new Set(fulfiller.deck)];

      
      requester.incoming.push({ tradeId: trade._id, incomingTrackId: trade.fulfillerTrackId, tradedTrackId: trade.requesterTrackId });
      // fulfiller.incoming.push({ tradeId: trade._id, incomingTrackId: trade.requesterTrackId, tradedTrackId: trade.fulfillerTrackId });

      await requester.save();
      await fulfiller.save();
      console.log("R:", requester, "F:", fulfiller);
      
      await Request.findByIdAndDelete(tradeInfo.requestId);

      res.send(trade);
    }
  } catch (err) {
    console.log('Something went wrong!', err);
    res.status(500).send(err);
  }
})

router.get("/getUserIncomingFeed", async (req, res) => {
  if (req.user) {
    const user = await User.findById(req.user._id);
    console.log("User:", user);
    if (req.user) {
      let incoming = user.incoming;
      console.log(incoming);
      let incomingInfo = incoming.map(async (incomingObj) => {
        const tradeInfo = await Trade.findById(incomingObj.tradeId);
        const incomingTrackInfo = await getTrackProcessed(incomingObj.incomingTrackId);
        const tradedTrackInfo = await getTrackProcessed(incomingObj.tradedTrackId);
        // console.log(tradeInfo, trackInfo);
        const tradeInfoProcessed = {
          _id: tradeInfo._id,
          selfName: tradeInfo.requesterName,
          selfId: tradeInfo.requesterId,
          selfLabel: tradeInfo.requesterLabel,
          selfTrackId: tradeInfo.requesterTrackId,
          traderName: tradeInfo.fulfillerName,
          traderId: tradeInfo.fulfillerId,
          traderLabel: tradeInfo.fulfillerLabel,
          traderTrackId: tradeInfo.fulfillerTrackId
        }
        
        return {
          tradeInfo: tradeInfoProcessed,
          incomingTrackInfo: incomingTrackInfo,
          tradedTrackInfo: tradedTrackInfo
        }
      });
      const allResults = await Promise.all(incomingInfo);
      console.log("All", allResults);
      res.send(allResults);
    }
  }
})

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
