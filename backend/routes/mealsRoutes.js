const express = require("express");
const router = express.Router();
const mealsModel = require("../models/meal");

router.get("/getmeals", async (req, res) => {
  try {
    const meals = mealsModel.find({});
    res.send(meals);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
