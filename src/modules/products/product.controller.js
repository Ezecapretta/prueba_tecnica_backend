const {
  getAllProductsFromDB,
  getProductByIdFromDB,
  updateProductInDB,
  createProductInDB,
  deleteProductInDB,
  filterProductsByName,
} = require("./product.service");

const getAllProducts = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const response = await getAllProductsFromDB(page, limit);
    return res.status(200).json({
      response,
      currentPage: page,
      perPage: limit,
    });
  } catch (error) {
    res.status(500).json({ error: "Error getting products" });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getProductByIdFromDB(id);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Error gettin product by Id" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await updateProductInDB(id, req);
    return res.status(202).json("Product updated successfully");
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
};

const createProduct = async (req, res) => {
  try {
    const response = req.body;
    await createProductInDB(response);
    return response.status(201).json("Product created successfully");
  } catch (error) {
    res.status(500).json({ error: "Error creating product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProductInDB(id);
    return res.status(202).json("Product deleted successfully");
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
};

const filterProducts = async (req, res) => {
  try {
    const { name } = req.params;
    const response = await filterProductsByName(name);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Error filtering products" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  updateProduct,
  createProduct,
  deleteProduct,
  filterProducts,
};
