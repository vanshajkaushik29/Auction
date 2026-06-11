const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
  title: String,

  startingBid: {
    type: Number,
    required: true
  },

  currentBid: {
    type: Number,
    default: 0
  },

  sold: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Auction", auctionSchema);