const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  avatarURL: String,
  deviceToken: {
    type: String,
    required: false,
  },
  providerID: String,
  phoneNumber: String,
  walletID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
    required: true,
  }
});

module.exports = mongoose.model("User", userSchema);
