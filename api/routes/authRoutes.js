const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')

// Fetch all users
router.get("/users", authController.fetchUsers);

// View logged in user's account
router.get("/user/:userID", authController.fetchUser);

// Update logged in user's account
router.patch('/user/:userID', authController.updateUser)

router.get('/logout', authController.logout)

// Delete logged in user's account
router.delete("/user/:userID", authController.updateUser);

// Create user
router.post('/register', authController.register)

// Log in user
router.post('/login', authController.login)

module.exports = router