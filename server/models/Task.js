/**
 * Title: models/Task.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket API
 */
const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
  item: { type: String, required: true },
  created: { type: Date, default: Date.now },
  status: { type: String, required: true, default: 'To Do' },
  empid: String,
  complete: Boolean
});

module.exports = mongoose.model('Task', TaskSchema);
