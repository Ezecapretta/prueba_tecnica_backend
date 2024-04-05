const express = require("express");
const {
  getAllProducts,
  getProductById,
  updateProduct,
  createProduct,
  deleteProduct,
  filterProducts,
} = require("./product.controller");

const productRouter = express.Router();

//Product
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.put("/:id", updateProduct);
productRouter.post("/", createProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/filter/:name", filterProducts);

module.exports = productRouter;
