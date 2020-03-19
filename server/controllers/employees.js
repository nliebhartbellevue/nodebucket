/**
 * Title: controllers/employees.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket API
 */
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Employee = require('../models/Employee');

/**
 * @desc        get all employees
 * @route       GET /api/v1/employees
 * @access      Private/Admin
 */
exports.getEmployees = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

/**
 * @desc        get employee by id
 * @route       GET /api/v1/employees/:empid
 * @access      Private/Admin
 */
exports.getEmployee = asyncHandler(async (req, res, next) => {
  const employee = await Employee.findOne(req.params.empid);

  res.status(200).json({
    success: true,
    data: employee
  });
});

/**
 * @desc        create employee
 * @route       POST /api/v1/employees
 * @access      Private/Admin
 */
exports.createEmployee = asyncHandler(async (req, res, next) => {
  const employee = await Employee.create(req.body);

  res.status(201).json({
    success: true,
    data: employee
  });
});

/**
 * @desc        update employee
 * @route       PUT /api/v1/employees/:id
 * @access      Private/Admin
 */
exports.updateEmployee = asyncHandler(async (req, res, next) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: employee
  });
});

/**
 * @desc        delete employee
 * @route       DELETE /api/v1/employees/:id
 * @access      Private/Admin
 */
exports.deleteEmployee = asyncHandler(async (req, res, next) => {
  await Employee.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});
