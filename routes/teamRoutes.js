const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamsController');

// // Create a new team
router.post('/', teamController.createTeam);

// // Get details of a specific team by ID
router.get('/:id', teamController.getTeamById);



module.exports = router;
