const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transSchema = new Schema({
  title: String,
  statusID: Number,
});

module.exports = mongoose.model("TransactionStatus", transSchema);
