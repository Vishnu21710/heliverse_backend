const express = require('express');
const router = express.Router();

// User routes
const userRoutes = require('./userRoutes.js');
router.use('/users', userRoutes);

// Team routes
const teamRoutes = require('./teamRoutes.js');
router.use('/team', teamRoutes);

module.exports = router;
