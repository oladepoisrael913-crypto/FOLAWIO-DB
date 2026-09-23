require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");

const app = express();


const port = process.env.PORT || 8000;


// const compass_string = "mongodb://localhost:27017/oladepoisrael913_db";
const atlas_string = process.env.MONGO_URI;


if (!atlas_string) {
  console.error("MONGO_URI is not set. Add it in Render > Environment.");
  process.exit(1);
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Is Active");
});

app.use("/users", userRoutes);
app.use("/products", productRoutes);

mongoose
  .connect(atlas_string)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database Connection Error:", err);
    process.exit(1);
  });