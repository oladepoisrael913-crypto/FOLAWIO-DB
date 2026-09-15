const userModel = require("../model/userModel.js");
const bcrypt = require("bcrypt");

// CRUD
// Create User (POST)
// Read User (GET)
// Update User (PUT)
// Delete User (DELETE)

// CREATE USER
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const getSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, getSalt);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.status(200).json({
      message: "Login successful",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GENERAL GET
const getAllUsers = async (req, res) => {
  try {
    const getAll = await userModel.find();
    return res.status(200).json({
      message: "All users fetched successfully",
      data: getAll,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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

    return res.status(200).json({
      message: "User fetched successfully",
      data: getSingle,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// UPDATE USER
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, password } = req.body;

    const updateData = { name, email };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const update = await userModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!update) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User updated successfully",
      data: update,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  LoginUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};