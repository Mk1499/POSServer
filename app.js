const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

const UserRouter = require("./routes/user");
const TransactionRouter = require("./routes/transaction");
const WalletRouter = require("./routes/wallet");

mongoose.connect(process.env.DBConnect);
mongoose.connection.once("open", () => {
  console.log("connected to Database");
});

app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Welcome in POS Server");
});
app.use("/user", UserRouter);
app.use("/trans", TransactionRouter);
app.use("/wallet", WalletRouter);

let port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(" server starts on port " + port);
});
