const express = require("express");
const userRoutes = express.Router();

const {
  createUser,
  LoginUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} = require("../controller/userController.js");

userRoutes.post("/create", createUser);
userRoutes.post("/login", LoginUser);
userRoutes.get("/getAll", getAllUsers);
userRoutes.get("/getSingle/:id", getSingleUser);
userRoutes.patch("/update/:userId", updateUser);
userRoutes.delete("/delete/:id", deleteUser);

module.exports = userRoutes;
