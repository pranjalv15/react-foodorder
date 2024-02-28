const mongoose = require("mongoose");

const userschema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userschema);

module.exports = userModel;
