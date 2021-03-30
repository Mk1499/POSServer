const express = require("express");
const User = require("../models/user.js");
const Wallet = require("../models/wallet.js");

const userRouter = express.Router();

userRouter.post("/add", (req, res) => {
  console.log("user Body ", req.body);
  let {
    username,
    password,
    avatarURL,
    deviceToken,
    providerID,
    phoneNumber,
  } = req.body;

  let wallet = new Wallet({});
  wallet
    .save()
    .then((wallet) => {
      let user = new User({
        username,
        password,
        avatarURL,
        deviceToken,
        providerID,
        phoneNumber,
        walletID: wallet._id,
      });
      return user;
    })
    .then((user) => {
      user
        .save()
        .then((user) => {
          res.status(200).json({
            message: "User Created!!",
          });
        })
        .catch((err) => {
          res.status(400).json({
            message: "Can't Add a user : " + err,
          });
        });
    });
});

userRouter.post("/login", (req, res) => {
  let { username, password } = req.body;
  User.findOne({
    username,
    password,
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json({
        message: "login err : " + err,
      });
    });
});

userRouter.delete("/delete", (req, res) => {
  let { userID } = req.body;
  User.deleteOne({
    _id: userID,
  })
    .then(() => {
      res.status(200).json({ message: "user deleted" });
    })
    .catch((err) => {
      res.status(400).json({ message: "can't delete user because : " + err });
    });
});

userRouter.get("/all", (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(400).json({ message: "can't list users because : ", err });
    });
});

module.exports = userRouter;
