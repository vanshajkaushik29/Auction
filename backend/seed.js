const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");
const Auction = require("./models/Auction");

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

    const user = await User.create({
        name: "Vanshaj",
        pocketBalance: 100
    });

    const auction = await Auction.create({
        title: "iPhone 16",
        startingBid: 50,
        currentBid: 0,
        sold: false
    });

    console.log("User:", user._id);
    console.log("Auction:", auction._id);

    process.exit();

});