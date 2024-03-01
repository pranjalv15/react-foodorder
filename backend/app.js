const fs = require("fs/promises");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const db = require("./data/database");
const stripe = require("stripe")(
  "sk_test_51OoqisSFhy76iYCdjq468N5EgVKmmWMOeILyWElmo247IByiBkyKiZUSBUgqLVbaGcGkb4AbleUVLw72Bpr3IgeO00bWQIYktL"
);

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("./public"));

app.get("/meals", async (req, res) => {
  const [meals] = await db.query("SELECT * FROM availablemeals");
  res.status(200).json(meals);
});

app.post("/orders", async (req, res) => {
  const user = req.body;
  let foundOrders = [];
  const [orders] = await db.query(
    "SELECT orders.id, orders.total_price, orders.order_date From orders WHERE orders.user_id = ?",
    [user.id]
  );

  for (let i = 0; i < orders.length; i++) {
    const id = orders[i].id;
    const [items] = await db.query(
      "SELECT orderitems.quantity, availablemeals.name From orderitems INNER JOIN availablemeals ON orderitems.availablemeal_id = availablemeals.id WHERE order_id = ?",
      [id]
    );
    foundOrders.push({
      price: orders[i].total_price,
      date: orders[i].order_date,
      items: items,
    });
  }

  res.status(200).json(foundOrders);
});

app.post("/register", async (req, res) => {
  const user = req.body;
  const [foundUser] = await db.query("SELECT * FROM users WHERE email = ? ", [
    user.email,
  ]);
  if (foundUser.length > 0) {
    res.status(200).send("Email Id already in use");
  } else {
    try {
      await db.query(
        "INSERT INTO users (name,email,password) VALUES (? , ?, ?)",
        [user.name, user.email, user.password]
      );
      res.status(201).send("User Registered Successfully!");
    } catch (error) {
      res.status(404).json({ message: error });
    }
  }
});

app.post("/login", async (req, res) => {
  const user = req.body;

  try {
    const [foundUsers] = await db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [user.email, user.password]
    );
    if (foundUsers.length > 0) {
      const currUser = {
        id: foundUsers[0].id,
        name: foundUsers[0].name,
        email: foundUsers[0].email,
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
    user_id: user.id,
    total_price: amount / 100,
  };
  await db.query("INSERT INTO orders (user_id, total_price) VALUES (? , ?)", [
    user.id,
    amount / 100,
  ]);

  const [orders] = await db.query("SELECT * from orders");
  const orderid = orders.length;

  for (let i = 0; i < items.length; i++) {
    await db.query(
      "INSERT INTO orderitems (order_id, availablemeal_id, quantity) VALUES (? , ?, ?)",
      [orderid, items[i].id, items[i].quantity]
    );
  }
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
