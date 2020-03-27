/**
 * Title: routes/employee.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
const express = require('express');
const auth = require('../middleware/auth');
const EmployeeController = require('../controllers/employee');

const router = express.Router();

// get profile of current authenticated employee
router.get('/me', auth, EmployeeController.getProfile);
// create employee profile
router.post('/', auth, EmployeeController.createProfile);

module.exports = router;
