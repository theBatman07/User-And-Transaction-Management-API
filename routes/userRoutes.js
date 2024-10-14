const express = require('express');
const { getUserById, createUser, getAllUsers } = require('../controllers/userController');
const router = express.Router();

// Get user details by ID
router.get('/:id', getUserById);

// Create a new user
router.post('/', createUser);

// Get all users
router.get('/', getAllUsers);

module.exports = router;
