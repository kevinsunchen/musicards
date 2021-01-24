const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  spotifyId: String,
  accessToken: String,
  points: Number,
  deck: [String],
  incoming: [{
    tradeId: String,
    incomingTrackId: String,
    tradedTrackId: String
  }],
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
