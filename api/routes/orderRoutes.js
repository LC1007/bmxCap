const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

router.post("/order/:userID/:bmxID", orderController.addOrder);
router.get('/orders/:userID', orderController.fetchOrders)
router.delete('/order/:orderID', orderController.deleteOrder)

module.exports = router;
