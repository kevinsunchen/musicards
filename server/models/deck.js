const mongoose = require("mongoose");

const DeckSchema = new mongoose.Schema({
  userId: String,
  spotifyId: String,
  deck: [String]
})

// compile model from schema
module.exports = mongoose.model("deck", DeckSchema);
