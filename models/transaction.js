const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  transactionStatusID: Number,
  transactionTypeID: Number,
  amountValue: Number,
  date: Date,
  receiverPhoneNumber: Number,
  senderPhoneNumber: Number,
  senderWalletID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
    required: false,
  },
  receiverWalletID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
    required: false,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
