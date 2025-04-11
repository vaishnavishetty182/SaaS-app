const mongoose = require('mongoose');

// Plan Schema
const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  features: [String],
  maxUsers: { type: Number, required: true },
  duration: { type: String, default: 'Yearly' }, // Default to yearly plan
  isActive: { type: Boolean, default: true },
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
