const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("../models/product.js");

// Import routes

//Router Middlewares
app.use(express.json());

//Type of query

/*

1. /
2. /?category=phone
3. /?category=laptop --> this means all the product in catgory of laptop
4. /?range=4000-5000 --> this means all the product in the range of 4000-5000
5. /?range=5000  --> this means all the product above 5000
6. /?range=4000-5000&category=laptop --> all the laptop that are in price range 4000-5000

*/

// Route to get count of all products
app.get("/", async function (req, res) {
  var count = 0;
  const c = await Product.countDocuments({});
  count = c;
  res.send(JSON.stringify(count));
});

// Route to get count of products in a category
app.get("/category", async function (req, res) {
  const category = req.query.category;
  const c = await Product.countDocuments({ category: category });
  var count = 0;
  count = c;
  res.send(JSON.stringify(count));
});

// Route to get count of products in a price range
app.get("/range", async function (req, res) {
  const range = req.query.range.split("-").map(Number);
  let query = { price: { $gte: range[0] } };
  if (range.length > 1) {
    query.price.$lte = range[1];
  }
  const c = await Product.countDocuments(query);
  var count = 0;
  count = c;
  res.send(JSON.stringify(count));
});

// Route to get count of products in a category and price range
app.get("/category-range", async function (req, res) {
  const category = req.query.category;
  const range = req.query.range.split("-").map(Number);
  const c = await Product.countDocuments({
    category: category,
    price: { $gte: range[0], $lte: range[1] },
  });
  var count = 0;
  count = c;
  res.send(JSON.stringify(count));
});

module.exports = app;
