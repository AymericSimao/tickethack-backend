var express = require("express");
var router = express.Router();
var moment = require("moment");

const Cart = require("../models/carts");

router.put("/trip", function (req, res) {
  //TODO: checkBody(req.body, ['cartId', 'tripId'])
  let result = {};

  Cart.updateOne(
    { _id: req.body.cartId },
    { $push: { trips: req.body.tripId } }
  )
    .then((data) => {
      if (data.modifiedCount === 1) {
        result.result = true;
        result.message = `trip ${req.body.tripId} has been added to cart`;
      } else {
        result.result = false;
        `failed to add trip ${req.body.tripId} to cart`;
      }
      Cart.findOne({ _id: req.body.cartId })
        .populate("trips")
        .then((cart) => {
          result.cart = cart;
          res.json(result);
        })
        .catch((error) => {
          console.log(error.message);
          res.json({
            result: false,
            message: error.message,
          });
        });
    })
    .catch((error) => {
      console.log(error.message);
      res.json({
        result: false,
        message: error.message,
      });
    });
});

router.get("/new", function (req, res) {
  newCart = new Cart({});
  newCart
    .save()
    .then((data) => {
      console.log(`Created cart with _id=${data._id}`);
      res.json({ result: true, cart: data });
    })
    .catch((error) => {
      console.log(error.message);
      res.json({
        result: false,
        message: error.message,
      });
    });
});

module.exports = router;
