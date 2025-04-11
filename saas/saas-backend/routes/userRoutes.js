const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Plan = require('../models/Plan');
const { verifyToken, isOrgAdmin } = require('../middleware/auth');
const router = express.Router();

// User Registration Route
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'User'  // default to 'User' role
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// User Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, 'secretKey', { expiresIn: '1h' });

    res.status(200).json({ token, message: 'Login successful' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch All Users (Admin only)
router.get('/', verifyToken, isOrgAdmin, async (req, res) => {
  try {
    const users = await User.find().populate('plan');  // Assuming users have a 'plan' reference
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user information (Admin only)
router.put('/:userId', verifyToken, isOrgAdmin, async (req, res) => {
  const { userId } = req.params;
  const { username, email, role, planId } = req.body;  // Assume planId is passed for user plan update

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update user information
    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;

    // Update user subscription plan
    if (planId) {
      const plan = await Plan.findById(planId);
      if (!plan) return res.status(404).json({ message: 'Plan not found' });
      user.plan = plan;
    }

    await user.save();
    res.status(200).json({ message: 'User updated successfully', user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Activate/Deactivate a User's Plan (Admin only)
router.put('/:userId/plan-status', verifyToken, isOrgAdmin, async (req, res) => {
  const { userId } = req.params;
  const { active } = req.body;  // Active status (true/false)

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update user's active status
    user.plan.active = active;

    await user.save();
    res.status(200).json({ message: `User's plan ${active ? 'activated' : 'deactivated'}` });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;