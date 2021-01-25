const mongoose = require("mongoose");

//define a story schema for the database
const RequestSchema = new mongoose.Schema({
  requesterId: String,
  requesterName: String,
  offeredTrackId: String,
  offeredLabel: String,
  requestedLabel: String
});

// compile model from schema
module.exports = mongoose.model("request", RequestSchema);
