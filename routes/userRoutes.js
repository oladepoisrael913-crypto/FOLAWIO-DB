const express = require("express");
const userRoutes = express.Router();

const {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} = require("../controller/userController.js");

userRoutes.post("/create", createUser);
userRoutes.get("/getAll", getAllUsers);
userRoutes.get("/getSingle/:id", getSingleUser);
userRoutes.patch("/update/:userId", updateUser);
userRoutes.delete("/delete/:id", deleteUser);
module.exports = userRoutes;