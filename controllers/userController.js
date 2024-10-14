const User = require('../models/userModel');

// Get User Details by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


// Create New User
exports.createUser = async (req, res) => {
    try {
      const { name, phoneNumber } = req.body;
  
      // Create a new user document
      const user = new User({
        name,
        phoneNumber
      });
  
      // Save the user to the database
      const savedUser = await user.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
// Get All Users
exports.getAllUsers = async (req, res) => {
try {
    const users = await User.find();
    res.json(users);
} catch (error) {
    res.status(500).json({ message: 'Server Error' });
}
};