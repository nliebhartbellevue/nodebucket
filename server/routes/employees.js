/**
 * Title: routes/employees.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket API
 */
const express = require('express');
const {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employees');
const Employee = require('../models/Employee');
const router = require('express').Router();
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

router
  .route('/')
  // [GET] - get all employees
  .get(advancedResults(Employee), getEmployees)
  // [POST] - create new employee
  .post(createEmployee);

router
  .route('/:empid')
  // [GET] - get employee by empid
  .get(getEmployee);
router
  .route('/:id')
  // [PUT] - update employee
  .put(updateEmployee)
  // [DELETE] - delete employee'
  .delete(deleteEmployee);

module.exports = router;
