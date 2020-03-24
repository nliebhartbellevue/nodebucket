/**
 * Title: controllers/inProgressTask.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket API
 */
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const advancedResults = require('../middleware/advancedResults');
const InProgressTask = require('../models/InProgressTask');

/**
 * @description     Get all in progress tasks
 * @route           GET /api/v1/inprogress
 * @access          Public
 */
exports.getInProgress = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

/**
 * @description     Create new in progress task
 * @route           POST /api/v1/inprogress
 * @access          Private
 */
exports.createInProgress = asyncHandler(async (req, res, next) => {
  // add employee to req.body
  req.body.employee = req.employee.id;

  const inProgressTask = await InProgressTask.create(req.body);

  res.status(201).json({
    success: true,
    data: inProgressTask
  });
});
