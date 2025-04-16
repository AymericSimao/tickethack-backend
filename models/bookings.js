const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
    trip: {type: mongoose.Schema.Types.Array, ref: "carts"},
    cart: {type: mongoose.Schema.Types.ObjectId, ref: "carts"},
    date: {type: Date, default: new Date(),
      }
})
const Booking = mongoose.model('bookings', bookingSchema)

module.exports = Booking