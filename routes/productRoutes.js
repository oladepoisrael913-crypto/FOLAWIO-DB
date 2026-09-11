const express = require("express");
const upload = require("../controller/productController.js");

const router = express.Router();

router.post("/upload/:userId", upload.uploadProduct);
router.get("/getAll", upload.getAllProducts);
module.exports = router;
