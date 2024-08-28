const User = require("../models/User");

// Get Users with Filtering, Searching, and Pagination
exports.getUsers = async (req, res) => {
  try {
    const { name, domain, gender, available, page = 1, limit = 20 } = req.query;

    // Build filter object
    let filter = {};
    if (name)
      filter.$or = [
        { first_name: { $regex: name, $options: "i" } },
        { last_name: { $regex: name, $options: "i" } },
      ];
    if (domain) filter.domain = domain;
    if (gender) filter.gender = gender;
    if (available !== undefined) filter.available = available === "true";

    // Apply pagination
    const users = await User.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await User.countDocuments(filter);

    res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get User based on ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update user based on id
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Create User
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Delete User Based on id
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ id: req.params.id });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
