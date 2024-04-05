const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  amount: Number,
  marca: String,
  name: String,
  color: [String],
  price: Number,
  description: String,
  image: String,
  active: Boolean,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
