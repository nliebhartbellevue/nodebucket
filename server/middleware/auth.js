/**
 * Title: middleware/auth.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket API
 */
const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const Employee = require('../models/Employee');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }

  // make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.employee = await Employee.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});

// grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.employee.role)) {
      return next(
        new ErrorResponse(
          `Employee role ${req.employee.role} is not autorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
