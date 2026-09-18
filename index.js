require("dotenv").config();

const express = require("express");


const app = express();
const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const port = 8000;
const mongoose = require("mongoose");
const compass_string = "mongodb://localhost:27017/oladepoisrael913_db";
const atlas_string = process.env.MONGO_URI

 mongoose.connect(atlas_string)
  .then(() => {
    console.log("MongoDB Connected"); // resolve messgage for my  project
  })
  .catch((err) => {
    console.error("Database Connection Error:", err); // error message for my project
  });

// const compass_string = "mongodb://localhost:27017"
// const atlas_string =
mongoose.connect(process.env.MONGO_URI);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Server Is Active");
});
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
