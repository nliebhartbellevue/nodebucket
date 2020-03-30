/**
 * Title: models/task.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  status: {
    type: String,
    enum: ['todo', 'progress', 'complete']
  },
  assignedTo: { type: String },
  createdBy: { type: String },
  lastModifiedBy: { type: String }
});

module.exports = mongoose.model('Task', taskSchema);
