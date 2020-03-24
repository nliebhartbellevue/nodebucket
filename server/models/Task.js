/**
 * Title: models/Task.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket API
 */
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  empid: String,
  skills: [String],
  startDate: Date,
  endDate: Date,
  start: Date,
  end: Date,
  bgColor: String
});

module.exports = mongoose.model('Task', TaskSchema);
