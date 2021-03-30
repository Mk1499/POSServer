const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transSchema = new Schema({
  typeID: Number,
  title: String,
});

module.exports = mongoose.model("TransactionType", transSchema);
