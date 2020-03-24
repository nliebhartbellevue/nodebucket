/**
 * Title: routes/completedTask.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket API
 */
const express = require('express');
const {
  getCompleted,
  createCompleted
} = require('../controllers/completedTask');
const CompletedTask = require('../models/CompletedTask');
const router = express.Router();
const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

router
  .route('/')
  // Get all completed task
  .get(advancedResults(CompletedTask), getCompleted)
  // Create new completed task
  .post(protect, createCompleted);

module.exports = router;
