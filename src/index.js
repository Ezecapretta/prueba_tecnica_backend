require("dotenv").config();
const express = require("express");
const connectToMongoDB = require("./modules/mongo/mongo.service");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const router = require("./routes/router");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

connectToMongoDB()
  .then(() => {
    app.use("/", router);
    app.get("/health", (_req, res) => {
      res.status(200).json("is Healthy");
    });
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log("Server listening on port", port);
    });
  })
  .catch(() => {
    console.error("Error connecting to MongoDB", error.message);
  });
