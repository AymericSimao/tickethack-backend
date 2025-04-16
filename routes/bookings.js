var express = require("express");
var router = express.Router();

const Booking = require("../models/bookings");
const Cart = require("../models/carts")

//POST /bookings permet de remplir la collection bookings avec le contenu d'une cart
router.post('/',(req,res) => {
    let {cartId} = req.body
    Cart.findOne({_id:cartId}).then(data => {
        const newBooking = new Booking({
        trip: data.trips,
        cart: data._id,
        })
        newBooking.save().then(data => res.json({result: "trip(s) ajouté à bookings"}))
})
.catch((error) => {
    console.log(error.message);
    res.json({
      result: false,
      message: error.message,
    });
  });
})


//GET "/" affiche tous les bookings enregistré
router.get('/',(req,res)=>{
Booking.find().then(data=> {
    res.json({result: data.trip})
})

.catch((error) => {
    console.log(error.message);
    res.json({
      result: false,
      message: error.message,
    });
  });
})

module.exports = router;