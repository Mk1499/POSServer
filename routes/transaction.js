const express = require("express");
const transRouter = express.Router();
const TransStatus = require("../models/transactionStatus");
const TransType = require("../models/transactionType");
const Transaction = require("../models/transaction");
const Wallet = require("../models/wallet");

transRouter.post("/addStatus", (req, res) => {
  let { title, statusID } = req.body;
  let newStatus = new TransStatus({
    statusID,
    title,
  });
  newStatus.save().then((status) => {
    res.status(200).json({
      message: "new status created",
      status,
    });
  });
});

transRouter.get("/listStatus", (req, res) => {
  TransStatus.find({})
    .then((types) => {
      res.status(200).json(types);
    })
    .catch((err) => {
      res.status(400).json({ message: "can't list status because : ", err });
    });
});

transRouter.post("/addType", (req, res) => {
  let { title, typeID } = req.body;
  let newType = new TransType({
    typeID,
    title,
  });
  newType.save().then((type) => {
    res.status(200).json({
      message: "new type created",
      type,
    });
  });
});

transRouter.get("/listTypes", (req, res) => {
  TransType.find({})
    .then((types) => {
      res.status(200).json(types);
    })
    .catch((err) => {
      res.status(400).json({ message: "can't list type because : ", err });
    });
});

transRouter.get("/all", (req, res) => {
  Transaction.find({})
    .limit(5)
    .then((transactions) => {
      res.status(200).json(transactions);
    })
    .catch((err) => {
      res.status(400).json({
        message: `can't list transactions because : ${err} `,
      });
    });
});

transRouter.post("/topup", (req, res) => {
  let {
    phoneNumber,
    pin,
    providerID,
    walletID,
    senderPhoneNumber,
    amount,
    paymentType,
    blockSMS,
  } = req.body;

  if (paymentType === "WALLET") {
    Wallet.findOne({
      _id: walletID,
    })
      .then((walletData) => {
        if (walletData.frozenBalance >= amount) {
          return Wallet.updateOne(
            { _id: walletID },
            { $inc: { frozenBalance: -1 * amount } }
          );
        } else {
          throw "Out of Balance";
        }
      })
      .then(() => {
        let transaction = new Transaction({
          transactionStatusID: 1,
          transactionTypeID: 2,
          amountValue: amount,
          date: new Date(),
          senderPhoneNumber: phoneNumber,
          receiverPhoneNumber: senderPhoneNumber,
        });
        return transaction.save();
      })
      .then((data) => {
        res.status(200).json({
          message: "ETopup Transaction Success ",
          data,
        });
      })
      .catch((walletErr) => {
        res.status(400).json({
          message: `ETopup Wallet Error : ${walletErr}`,
        });
      });
  } else {
    res.status(400).json({
      message: `Wrong Payment Type "must be WALLET"`,
    });
  }
});

transRouter.post("/orangeCash", (req, res) => {
  let {
    phoneNumber,
    pin,
    providerID,
    walletID,
    senderPhoneNumber,
    amount,
    blockSMS,
  } = req.body;

  Wallet.findOne({
    _id: walletID,
  })
    .then((walletData) => {
      console.log(
        "check balance : ",
        walletData,
        amount,
        walletData.orangeCacheBalance < amount
      );
      if (walletData.orangeCacheBalance >= amount) {
        return Wallet.updateOne(
          { _id: walletID },
          { $inc: { orangeCacheBalance: -1 * amount } }
        );
      } else {
        throw new Error("Out of Balance");
      }
    })
    .then(() => {
      let transaction = new Transaction({
        transactionStatusID: 1,
        transactionTypeID: 1,
        amountValue: amount,
        date: new Date(),
        senderPhoneNumber: phoneNumber,
        receiverPhoneNumber: senderPhoneNumber,
      });
      return transaction.save();
    })
    .then((data) => {
      res.status(200).json({
        message: "Orange Cash Transaction Success ",
        data,
      });
    })
    .catch((walletErr) => {
      res.status(400).json({
        message: `Orange Cash Wallet Error : ${walletErr}`,
      });
    });
});

module.exports = transRouter;
