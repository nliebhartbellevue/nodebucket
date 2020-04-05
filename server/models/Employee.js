/**
 * Title: models/employee.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const employeeSchema = new mongoose.Schema({
  empid: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['admin', 'manager', 'user'], default: 'user' },
  avatarPath: { type: String },
  designation: { type: String },
  deleted: Boolean
});

employeeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Employee', employeeSchema);
