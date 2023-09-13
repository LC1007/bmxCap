const express = require("express");
const router = express.Router();
const prodController = require("../controller/productController");
const { verifyToken } = require('../middleware/AuthenicateUser')

router.get("/products", verifyToken, prodController.fetchProducts);
router.get("/products/search/:prodName", prodController.findProduct);
router.get("/product/:bmxID", prodController.fetchProduct);
router.get("/products/featured", prodController.featuredProducts);
router.post("/products", prodController.createProduct);
router.patch("/product/:bmxID", verifyToken, prodController.updateProduct);
router.delete("/product/:bmxID", verifyToken, prodController.deleteProduct);

module.exports = router;
