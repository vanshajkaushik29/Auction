const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Auction = require("../models/Auction");

router.post("/bid", async (req, res) => {
  try {
    const { userId, auctionId, bidAmount } = req.body;

    const user = await User.findById(userId);

    const auction = await Auction.findById(auctionId);

    if (!user || !auction) {
      return res.status(404).json({
        message: "User or Auction not found"
      });
    }

    // Sold check

    if (auction.sold) {
      return res.status(400).json({
        message: "Item already sold"
      });
    }

    const minimumBid =
      auction.currentBid > 0
        ? auction.currentBid
        : auction.startingBid;

    // Current bid check

    if (bidAmount <= minimumBid) {
      return res.status(400).json({
        message: `Bid must be greater than ₹${minimumBid}`
      });
    }

    // Wallet check

    if (bidAmount > user.pocketBalance) {
      return res.status(400).json({
        message: "Insufficient Balance"
      });
    }

    auction.currentBid = bidAmount;

    await auction.save();

    res.json({
      success: true,
      message: "Bid Placed Successfully",
      currentBid: auction.currentBid
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
});

router.get("/auction/:id", async (req, res) => {

  const auction = await Auction.findById(req.params.id);

  res.json(auction);

});

module.exports = router;