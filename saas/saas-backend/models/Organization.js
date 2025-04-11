const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  createdBy: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Organization', OrganizationSchema);
