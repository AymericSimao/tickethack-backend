const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  cartCreationDate: {
    type: Date,
    default: new Date(),
  },
  status: {
    type: String,
    enum: ["Paid", "Reimbursed", "Abandonned", "Pending"],
    default: "Pending",
  },
  trips: [
    {
      type: mongoose.Types.ObjectId,
      ref: "trips",
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  cartPaidDate: Date,
});

const Trip = mongoose.model("carts", cartSchema);

module.exports = Trip;
