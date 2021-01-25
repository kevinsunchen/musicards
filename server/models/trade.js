const mongoose = require("mongoose");

//define a story schema for the database
const TradeSchema = new mongoose.Schema({
  requesterName: String,
  requesterId: String,
  requesterLabel: String,
  requesterTrackId: String,
  fulfillerName: String,
  fulfillerId: String,
  fulfillerLabel: String,
  fulfillerTrackId: String
});

// compile model from schema
module.exports = mongoose.model("trade", TradeSchema);
