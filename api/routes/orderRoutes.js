const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");
// const { verifyToken } = require('../middleware/AuthenicateUser')

router.post("/orders/:userID/:bmxID", orderController.addOrder);
router.get('/orders/:userID', orderController.fetchOrders)

module.exports = router;
