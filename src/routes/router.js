const express = require("express");
const productRouter = require("../modules/products/product.router");

const router = express.Router();

//Product
router.use("/product", productRouter);

module.exports = router;
