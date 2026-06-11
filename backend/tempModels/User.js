const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  pocketBalance: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("User", userSchema);