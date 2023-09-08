const express = require("express");
const router = express.Router();
const prodController = require("../controller/productController");
// const { verifyToken } = require('../middleware/AuthenicateUser')

router.get("/products", prodController.fetchProducts);
router.get("/product/:bmxID", prodController.fetchProduct);
router.post("/products", prodController.createProduct);

module.exports = router;
