/**
 * Title: models/employee.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const employeeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  avatarPath: String,
  name: String,
  designation: String
});

employeeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Employee', employeeSchema);
