/**
 * Title: models/task.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  id: Number,
  title: String,
  people: Number,
  skills: [
    {
      id: Number,
      name: String
    }
  ],
  startDate: Date,
  endDate: Date,
  start: Date,
  end: Date,
  bgColor: String
});

module.exports = mongoose.model('Task', taskSchema);
