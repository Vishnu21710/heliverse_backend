// controllers/teamController.js
const Team = require('../models/Team');
const User = require('../models/User');

// Create a new team
exports.createTeam = async (req, res) => {
  try {
    const { name, memberIds } = req.body;

    // Retrieve users by IDs
    const members = await User.find({ _id: { $in: memberIds } });

    // Check for unique domains and availability
    const domains = new Set();
    for (const member of members) {
      if (domains.has(member.domain) || !member.available) {
        return res.status(400).json({ error: 'Users must have unique domains and be available.' });
      }
      domains.add(member.domain);
    }

    const team = new Team({
      name,
      members: memberIds,
    });

    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a team by ID
exports.getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('members');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
