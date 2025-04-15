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

//GET / affiche les trips dans mon panier
router.get('/:id',(req,res) => {
  Cart.findOne({_id: req.params.id}).populate('trips').then(data => res.json({result: data.trips}))
})

//DELETE /trip supprime l'ID stocké dans le panier
router.delete('/trip',(req,res) => {
  let {cartId, tripId}=req.body
  Cart.updateOne({_id: cartId}, {$pull: {trips: tripId}}).then(data => { 
      console.log(data);
      res.json({result: data.trips})})
  })

module.exports = router;