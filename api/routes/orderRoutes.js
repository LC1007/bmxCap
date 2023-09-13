const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");
const { verifyToken } = require("../middleware/AuthenicateUser");

router.post("/order/:userID/:bmxID", verifyToken, orderController.addOrder);
router.get('/orders/:userID', verifyToken, orderController.fetchOrders)
router.delete('/order/:orderID', verifyToken, orderController.deleteOrder)

module.exports = router;
