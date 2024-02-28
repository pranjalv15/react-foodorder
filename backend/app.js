const fs = require("fs/promises");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const mealsModel = require("./models/meal");
const userModel = require("./models/userModel");
const orderModel = require("./models/orderModel");
const stripe = require("stripe")(
  "sk_test_51OoqisSFhy76iYCdjq468N5EgVKmmWMOeILyWElmo247IByiBkyKiZUSBUgqLVbaGcGkb4AbleUVLw72Bpr3IgeO00bWQIYktL"
);
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("./public"));

var mongoURL =
  "mongodb+srv://vyaspranjal015:Password15@clusterfoodapp.ng7592r.mongodb.net/food-app-data";
mongoose.connect(mongoURL);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/meals", async (req, res) => {
  const meals = await mealsModel.find();
  res.status(200).json(meals);
});

app.post("/orders", async (req, res) => {
  const user = req.body;
  const foundOrders = await orderModel.find({ email: user.email });
  res.status(200).json(foundOrders);
});

// app.get("/meals", async (req, res) => {
//   const meals = await fs.readFile("./data/available-meals.json", "utf8");
//   res.status(200).json(JSON.parse(meals));
// });

app.post("/register", async (req, res) => {
  const user = req.body;
  const foundUser = await userModel.find({ email: user.email });
  console.log(foundUser);
  if (foundUser.length > 0) {
    res.status(200).send("Email Id already in use");
  } else {
    const newUser = userModel(user);
    try {
      newUser.save();
      res.status(201).send("User Registered Successfully!");
    } catch (error) {
      res.status(404).json({ message: error });
    }
  }
});

app.post("/login", async (req, res) => {
  const user = req.body;

  try {
    const foundUsers = await userModel.find(user);
    if (foundUsers.length > 0) {
      const currUser = {
        name: foundUsers[0].name,
        email: foundUsers[0].email,
        _id: foundUsers[0]._id,
      };
      res.status(201).send(currUser);
    } else {
      res.status(404).json({ message: "User Data not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

app.post("/placeorder", async (req, res) => {
  const { token, amount, user, items } = req.body;
  console.log(amount);
  const order = {
    name: user.name,
    email: user.email,
    amount: amount / 100,
    items: items,
  };
  const newOrder = orderModel(order);
  newOrder.save();
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.charges.create(
      {
        amount: amount,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      res.status(200).send("Payment Done!");
    } else {
      res.status(400).send("Payment Failed!");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});

module.exports = app;
app.listen(3000);
