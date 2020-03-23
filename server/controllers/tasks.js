/**
 * Title: controllers/task.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket API
 */
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const advancedResults = require('../middleware/advancedResults');
const Task = require('../models/Task');

/**
 * @description     Get all tasks
 * @route           GET /api/v1/tasks
 * @access          Public
 */
exports.getTasks = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

/**
 * @description     GET task by id
 * @route           GET /api/v1/tasks/:id
 * @access          Public
 */
exports.getTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new ErrorResponse(`Task not found!`, 404));
  }

  return res.status(200).json({ success: true, data: task });
});

/**
 * @description     Create new task
 * @route           POST /api/v1/tasks
 * @access          Private
 */
exports.createTask = asyncHandler(async (req, res, next) => {
  // add employee to req.body
  req.body.employee = req.employee.id;

  const task = await Task.create(req.body);

  res.status(201).json({
    success: true,
    data: task
  });
});

/**
 * @description     Update task
 * @route           PUT /api/vi/tasks/:id
 * @access          Private
 */
exports.updateTask = asyncHandler(async (req, res, next) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    return next(new ErrorResponse('Task not found!', 404));
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: task
  });
});

/**
 * @description     Delete task
 * @route           DELETE /api/v1/tasks/:id
 * @access          Private
 */
exports.deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new ErrorResponse('Task not found!', 404));
  }

  await task.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
