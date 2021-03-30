const express = require("express");
const walletRouter = express.Router();
const Wallet = require("../models/wallet");

walletRouter.get("/all", (req, res) => {
  Wallet.find({})
    .then((wallets) => {
      res.status(200).json(wallets);
    })
    .catch((err) => {
      res.status(400).json({ message: "can't list wallets" });
    });
});

walletRouter.get("/:id", (req, res) => {
  let { id } = req.params;
  Wallet.findById(id)
    .then((wallet) => {
      res.status(200).json(wallet);
    })
    .catch((err) => {
      res.status(400).json({
        message: `Can't get wallet with id ${id} because ${err}`,
      });
    });
});

module.exports = walletRouter;
