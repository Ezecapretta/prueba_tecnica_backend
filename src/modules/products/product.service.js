const Product = require("../../models/productModel");

const getAllProductsFromDB = async (page, limit) => {
  try {
    const skip = (page - 1) * limit;
    const products = await Product.find({}, null, { skip, limit });
    return products;
  } catch (error) {
    throw error;
  }
};

const getProductByIdFromDB = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) throw new Error("Invalid Id");
    return product;
  } catch (error) {
    throw error;
  }
};

const updateProductInDB = async (id, req) => {
  try {
    const { amount, marca, name, color, price, description, image } = req.body;
    const productExists = await Product.findById(id);
    if (!productExists) throw new Error("Invalid Id");
    const updatedProduct = await Product.updateOne(
      { _id: id },
      {
        $set: {
          amount: amount,
          marca: marca,
          name: name,
          color: color,
          price: price,
          description: description,
          image: image,
        },
      }
    );
    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

const createProductInDB = async (body) => {
  try {
    const productExists = await Product.findOne({ name: body.name });
    if (productExists) throw new Error(`${body.name} already exists`);
    const newProduct = new Product({
      amount: body?.amount,
      marca: body?.marca,
      name: body?.name,
      color: body?.color,
      price: body?.price,
      description: body?.description,
      image: body?.image,
      active: true,
    });
    await newProduct.save();
    return newProduct;
  } catch (error) {
    throw error;
  }
};

const deleteProductInDB = async (id) => {
  try {
    const productExists = await Product.findById(id);
    if (!productExists) throw new Error("Invalid Id");
    const deletedProduct = await Product.findOneAndDelete({ _id: id });
    return deletedProduct;
  } catch (error) {
    throw error;
  }
};

const filterProductsByName = async (name) => {
  try {
    const products = await Product.find({
      name: { $regex: new RegExp(name, "i") },
    });
    return products;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllProductsFromDB,
  getProductByIdFromDB,
  updateProductInDB,
  createProductInDB,
  deleteProductInDB,
  filterProductsByName,
};
