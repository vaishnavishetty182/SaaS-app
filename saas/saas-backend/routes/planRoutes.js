const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan');

// Add a new Plan
router.post('/', async (req, res) => {
  try {
    const { name, price, features, maxUsers, duration } = req.body;

    const newPlan = new Plan({
      name,
      price,
      features,
      maxUsers,
      duration,
    });

    await newPlan.save();
    res.status(201).json({ message: 'Plan created successfully', plan: newPlan });
  } catch (error) {
    res.status(500).json({ message: 'Error creating plan', error: error.message });
  }
});

// Get all Plans
router.get('/', async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plans', error: error.message });
  }
});

// Edit a Plan
router.put('/:id', async (req, res) => {
  try {
    const { name, price, features, maxUsers, duration, isActive } = req.body;
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      { name, price, features, maxUsers, duration, isActive },
      { new: true }
    );
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.status(200).json({ message: 'Plan updated successfully', plan });
  } catch (error) {
    res.status(500).json({ message: 'Error updating plan', error: error.message });
  }
});

// Delete a Plan
router.delete('/:id', async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.status(200).json({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting plan', error: error.message });
  }
});

module.exports = router;
