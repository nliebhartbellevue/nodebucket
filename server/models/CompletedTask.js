/**
 * Title: models/CompletedTask.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket API
 */
const mongoose = require('mongoose');

const CompletedTaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  empid: String,
  skills: [String],
  startDate: Date,
  endDate: Date,
  strat: Date,
  end: Date,
  bgColor: String
});

module.exports = mongoose.model('CompletedTask', CompletedTaskSchema);
