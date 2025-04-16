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
Booking.find().populate('trip').then(data=> {
  tripsArr = []
  for (let i=0;i<data.length;i++){//boucle pour entrer dans les ID bookings
    for(let j=0;j<data[i].trip.length;j++){//boucle pour entrer dans les infos populate des trip enregistrés du booking
      tripsArr=tripsArr.concat(data[i].trip) //concaténation du tableau vide tripArr avec tous les tableaux populate des trip
    }
  }
  res.json({result: tripsArr})

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