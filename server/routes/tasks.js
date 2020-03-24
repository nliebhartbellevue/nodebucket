/**
 * Title: routes/task.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket API
 */
const express = require('express');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/tasks');
const Task = require('../models/Task');
const router = express.Router();
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  // Get all tasks
  .get(advancedResults(Task), getTasks)
  // create new task
  .post(protect, createTask);

router
  .route('/:id')
  // get task by id
  .get(getTask)
  // update task by id
  .put(protect, updateTask)
  // delete task by id
  .delete(protect, deleteTask);

module.exports = router;
