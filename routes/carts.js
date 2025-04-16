var express = require("express");
var router = express.Router();

const Cart = require("../models/carts");

//PUT /trip permet d'ajouter un trip de plus dans mon panier
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

//GET /new permet d'afficher le trip ajouté au panier
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

//GET /:cartId [affiche l'élément cart]
router.get("/:cartId", (req, res) => {
  Cart.findOne({ _id: req.params.cartId })
    .populate("trips")
    .then((data) => {
      if (data._id) {
        res.json({
          result: true,
          cart: data,
          message: `Able to find Cart ${req.params.cartId}`,
        });
      } else {
        res.json({
          result: false,
          message: `Not able to find Cart ${req.params.cartId}`,
        });
      }
    })
    .catch((error) => {
      console.log(error.message);
      res.json({
        result: false,
        message: error.message,
      });
    });
});

//DELETE /trip [supprime l'ID stocké dans le panier]
router.delete("/trip", (req, res) => {
  let { cartId, tripId } = req.body;
  Cart.updateOne({ _id: cartId }, { $pull: { trips: tripId } })
    .then((data) => {
      if (data.modifiedCount === 1) {
        res.json({
          result: true,
          message: `Trip ${tripId} has been removed from Cart ${cartId}`,
        });
      } else {
        res.json({
          result: false,
          message: `Enable to remove Trip ${tripId} from Cart ${cartId}`,
        });
      }
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
