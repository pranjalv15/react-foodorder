const mongoose = require("mongoose");

const orderschema = new mongoose.Schema(
  {
    name: String,
    email: String,
    amount: Number,
    items: Array,
  },
  { timestamps: true }
);

const orderModel = mongoose.model("orders", orderschema);

module.exports = orderModel;
