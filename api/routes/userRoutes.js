const express = require("express");
const router = express.Router();
const userController = require("../controller/authController");
// const { verifyToken } = require('../middleware/AuthenicateUser')

router.get("/users", userController.fetchUsers);

module.exports = router;
