const userModel = require("../model/userModel.js");

// CRUD
// Create User (POST)
// Read User (GET)
// Update User (PUT)
// Delete User (DELETE)

// CREATE USER
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.create({ name, email, password });
    res.status(201).json({ message: "User created successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GENERAL GET
const getAllUsers = async (req, res) => {
  try {
    const getAll = await userModel.find();
    return res
      .status(200)
      .json({ message: "All users connected  successfully", data: getAll });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// SINGLE GET
const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const getSingle = await userModel.findById(id);
    if (!getSingle) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User fetched successfully", data: getSingle });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// UPDATE USER
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, password } = req.body;
    const update = await userModel.findByIdAndUpdate(
      userId,
      { name, email, password },
      { new: true },
    );
    return res
      .status(200)
      .json({ message: "User updated successfully", data: update });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await userModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
