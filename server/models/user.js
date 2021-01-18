const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  spotifyId: String,
});

const DeckSchema = new mongoose.Schema({
  userId: String,
  spotifyId: String,
  deck: [String]
})

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
