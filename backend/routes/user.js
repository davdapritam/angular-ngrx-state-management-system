const express = require('express');
const User = require('../schema/user.model');
const router = express.Router();

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const { name, email, mobileNumber } = req.body;
    const user = new User({ name, email, mobileNumber });
    await user.save();
    res.status(201).json({ statusCode: 201, data: user });
  } catch (error) {
    res.status(400).json({ statusCode: 400, error: error.message });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ statusCode: 200, data: users });
  } catch (error) {
    res.status(500).json({ statusCode: 500, error: error.message });
  }
});

// Get a user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ statusCode: 404, error: 'User not found' });
    res.status(200).json({ statusCode: 200, data: user });
  } catch (error) {
    res.status(500).json({ statusCode: 500, error: error.message });
  }
});

// Update a user
router.put('/users/:id', async (req, res) => {
  try {
    const { name, email, mobileNumber } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name, email, mobileNumber }, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ statusCode: 404, error: 'User not found' });
    res.status(200).json({ statusCode: 200, data: user });
  } catch (error) {
    res.status(400).json({ statusCode: 400, error: error.message });
  }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ statusCode: 404, error: 'User not found' });
    res.status(200).json({ statusCode: 200, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ statusCode: 500, error: error.message });
  }
});

module.exports = router;
