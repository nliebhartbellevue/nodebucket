/**
 * Title: controllers/tasks.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket API
 */
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Task = require('../models/Task');

/**
 * @desc    Get all tasks
 * @route   GET /api/v1/tasks
 * @access  Public
 */

exports.getTasks = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

/**
 * @desc    Get task by id
 * @route   GET /api/v1/tasks/:id
 * @access  Public
 */
exports.getTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ sucess: true, data: task });
});

/**
 * @desc    Create new task
 * @route   POST /api/v1/tasks
 * @access  Private
 */
exports.createTask = asyncHandler(async (req, res, next) => {
  // Add employee to req body
  req.body.employee = req.employee.id;

  // Checks if employee is Admin or Manager
  if (req.employee.role !== 'admin' || req.employee.role !== 'manager') {
    return next(
      new ErrorResponse(`The employee isn't authorized to add tasks`, 400)
    );
  }

  const task = await Task.create(req.body);

  res.status(201).json({
    success: true,
    data: task
  });
});

/**
 * @desc    Update task
 * @route   PUT /api/v1/tasks/:id
 * @access  Private
 */
exports.updateTask = asyncHandler(async (req, res, next) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`Taks not found with id of ${req.params.id}`, 404)
    );
  }

  // make sure employee is either manager or admin
  if (req.employee.role !== 'admin' || req.employee.role !== 'manager') {
    return next(new ErrorResponse(`Employee is not authorized`, 401));
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    renValidators: true
  });

  res.status(200).json({ success: true, data: task });
});

/**
 * @desc    Delete task
 * @route   DELETE /api/v1/tasks/:id
 * @access  Private
 */
exports.deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new ErrorResponse(`Task not found!`, 404));
  }

  // mqake sure employee is either manager or admin
  if (req.employee.role !== 'admin' || req.employee.role !== 'manager') {
    return next(new ErrorResponse(`Employee is not authorized`, 401));
  }

  await task.remove();

  res.status(200).json({ success: true, data: {} });
});
