/**
 * Title: models/employee.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const employeeSchema = new mongoose.Schema({
  empid: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: { type: String, required: true },
  name: String,
  role: { type: String, enum: ['admin', 'manager', 'user'], default: 'user' },
  avatarPath: String,
  designation: String
});

employeeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Employee', employeeSchema);
