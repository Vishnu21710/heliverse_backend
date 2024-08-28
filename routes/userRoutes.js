const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// router.post('/users', userController.createUser);
router.get('/', userController.getUsers);

// router.get('/:id', userController.getUserById);

// // Create a new user
router.post('/', userController.createUser);

// // Update an existing user by ID
router.put('/:id', userController.updateUser);

// // Delete a user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;