const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const walletSchema = new Schema({
  orangeCacheBalance: {
    type: Number,
    default: 0,
  },
  frozenBalance: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Wallet", walletSchema);
