/**
 * Title: controllers/completedTask.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket API
 */
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const advancedResults = require('../middleware/advancedResults');
const CompletedTask = require('../models/CompletedTask');

/**
 * @description     Get all completed task
 * @route           GET /api/v1/completed
 * @access          Public
 */
exports.getCompleted = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

/**
 * @description     Create new completed task
 * @route           POST /api/v1/completed
 * @access          Private
 */
exports.createCompleted = asyncHandler(async (req, res, next) => {
  // add employee to req.body
  req.body.employee = req.employee.id;

  const completed = await CompletedTask.create(req.body);

  res.status(201).json({
    success: true,
    data: completed
  });
});
