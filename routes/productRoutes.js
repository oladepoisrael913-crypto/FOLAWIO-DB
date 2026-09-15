const express = require("express");
const upload = require("../Config/multer.js");
const {
	uploadProduct,
	getAllProducts,
} = require("../controller/productController.js");

const router = express.Router();

router.post("/upload/:userId", upload.single("image"), uploadProduct);
router.get("/getAll", getAllProducts);
module.exports = router;
