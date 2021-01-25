const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  spotifyId: String,
  accessToken: String,
  lifetimePoints: {
    type: Number,
    default: 0
  },
  currentPoints: {
    type: Number,
    default: 0
  },
  numRates: {
    type: Number,
    default: 0
  },
  deck: [String],
  incoming: [{
    tradeId: String,
    incomingTrackId: String,
    tradedTrackId: String
  }]
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
