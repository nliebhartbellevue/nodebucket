/**
 * Title: routes/employee.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');

const router = express.Router();

/**
 * @route         [POST]api/v2/auth/register
 * @description   register new employee
 * @access        Public
 */
router.post('/auth/register', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const employee = new Employee({
      empid: req.body.empid,
      email: req.body.email,
      password: hash,
      name: req.body.name,
      role: req.body.role,
      avatarPath: req.body.avatarPath,
      designation: req.body.designation
    });

    // save new employee to database
    employee
      .save()
      .then(result => {
        res.status(201).json({
          message: `Welcome ${employee.name} to NodeBucket!`,
          result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: `Internal Error: ${err.message}`
        });
      });
  });
});

/**
 * @route         [GET] api/v2/employee
 * @description   Get all employee documents
 * @access        Public
 */
router.get('/employee', (req, res, next) => {
  Employee.find().then(docs => {
    res.status(200).json({
      message: `Fetched ${docs.length} employee records`,
      employees: docs
    });
  });
});

/**
 * @route         [GET] api/v2/employee/:empid
 * @description   Get an employee by empid
 * @access        Public
 */
router.get('/employee/:empid', (req, res, next) => {
  Employee.findOne({ empid: req.params.empid }).then(employee => {
    if (employee) {
      res.status(200).json({
        message: `Employee #${employee.empid}, found successfully`,
        employee
      });
    } else {
      res.status(404).json({
        message: 'Employee not found!'
      });
    }
  });
});

/**
 * @route         [POST] api/v2/auth/login
 * @description   Login route
 * @access        Public
 */
router.post('/auth/login', (req, res, next) => {
  let tmpEmployee;
  Employee.findOne({ empid: req.body.empid })
    .then(employee => {
      if (!employee) {
        return res.status(401).json({
          message: 'Authentication Failed!'
        });
      }
      tmpEmployee = employee;
      return bcrypt.compare(req.body.password, employee.password);
    })
    .then(result => {
      console.log(result);
      if (!result) {
        return res.status(401).json({
          message: 'Authentication Failed!'
        });
      }
      const token = jwt.sign(
        {
          empid: tmpEmployee.empid,
          email: tmpEmployee.email,
          role: tmpEmployee.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );
      res.status(200).json({
        token,
        expiresIn: 3600,
        empid: tmpEmployee.empid,
        email: tmpEmployee.email,
        role: tmpEmployee.role
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Authentication Failed - Token!'
      });
    });
});

module.exports = router;
