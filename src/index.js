require("dotenv").config();
const express = require("express");
const connectToMongoDB = require("./modules/mongo/mongo.service");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const router = require("./routes/router");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

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
