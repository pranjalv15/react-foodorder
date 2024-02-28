const mongoose = require("mongoose");

const mealschema = new mongoose.Schema({
  id: String,
  name: String,
  price: String,
  desciption: String,
  image: String,
});

const mealsModel = mongoose.model("available_meals", mealschema);

module.exports = mealsModel;
