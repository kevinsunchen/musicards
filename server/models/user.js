const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  spotifyId: String,
  accessToken: String,
  deck: [String],
  incoming: [{
    tradeId: String,
    incomingTrackId: String,
    tradedTrackId: String
  }],
  points: Number
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
