const productModel = require("../model/productModel.js");
const userModel = require("../model/userModel.js");
const cloudinary = require("../Config/cloudinary.js");
/** create: upload product */

const uploadProduct = async (req, res) => {
  try {
    const getUserId = await userModel.findById(req.params.userId);
    const { name, description, price, quantity, category, stock, } =
      req.body;
    if (!getUserId) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No image file provided, please upload an image" });
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    const image = result.secure_url;

    const newProduct = await productModel.create({
      name,
      description,
      price,
      quantity,
      category,
      stock,
      image: image,
    });

    await getUserId.products.push(newProduct._id);
    await getUserId.save();
    res
      .status(201)
      .json({ message: "Product uploaded successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error uploading product", error });
  }
};

// get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// update product
// delete product
module.exports = { uploadProduct, getAllProducts };
