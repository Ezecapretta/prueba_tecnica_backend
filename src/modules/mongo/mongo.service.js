const mongoose = require("mongoose");

// const URI = "mongodb://localhost:27017/product-db";
const URI =
  "mongodb+srv://admin23:QJzJbFBXWCUWSc7E@cluster0.xmu3qzl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(URI, {
      socketTimeoutMS: 30000,
      family: 4,
    });
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error.message);
  }
};

module.exports = connectToMongoDB;
