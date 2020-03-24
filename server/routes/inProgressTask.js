/**
 * Title: routes/inProgressTask.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket API
 */
const express = require('express');
const {
  getInProgress,
  createInProgress
} = require('../controllers/inProgressTask');
const InProgressTask = require('../models/InProgressTask');
const router = express.Router();
const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

router
  .route('/')
  // Get all in progress tasks
  .get(advancedResults(InProgressTask), getInProgress)
  // Create ne in progress task
  .post(protect, createInProgress);

module.exports = router;
