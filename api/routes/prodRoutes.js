const express = require("express");
const router = express.Router();
const prodController = require("../controller/productController");

router.get("/products", prodController.fetchProducts);
router.post("/products/search/:prodName", prodController.findProduct);
router.get("/product/:bmxID", prodController.fetchProduct);
router.get("/products/featured", prodController.featuredProducts);
router.post("/products", prodController.createProduct);
router.patch("/product/:bmxID", prodController.updateProduct);
router.delete("/product/:bmxID", prodController.deleteProduct);

module.exports = router;
