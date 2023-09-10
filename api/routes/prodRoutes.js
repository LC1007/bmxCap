const express = require("express");
const router = express.Router();
const prodController = require("../controller/productController");

router.get("/products", prodController.fetchProducts);
router.get("/product/:bmxID", prodController.fetchProduct);
router.post("/products", prodController.createProduct);
router.patch("/product/:bmxID", prodController.updateProduct);
router.delete("/product/:bmxID", prodController.deleteProduct);

module.exports = router;
