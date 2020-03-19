/**
 * Title: controllers/auth.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket API
 */
const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');
const Employee = require('../models/Employee');

/**
 * @desc        Register Employee
 * @route       POST /api/v1/auth/register
 * @access      Public
 */
exports.register = asyncHandler(async (req, res, next) => {
  const { empid, firstName, lastName, email, role, password } = req.body;

  // create employee
  const employee = await Employee.create({
    empid,
    firstName,
    lastName,
    email,
    role,
    password
  });

  sendTokenResponse(employee, 200, res);
});

/**
 * @desc        Login employee
 * @route       POST /api/v1/auth/login
 * @acess       Public
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { empid, password } = req.body;

  // validate empid and password
  if (!empid || !password) {
    return next(new ErrorResponse('Please provide a empid and password', 400));
  }

  // check for employee
  const employee = await Employee.findOne({ empid }).select('+password');

  if (!employee) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // check if password matches
  const isMatch = await employee.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(employee, 200, res);
});

/**
 * @desc        Log employee out & clear cookie
 * @route       GET /api/v1/auth/logout
 * @access      Private
 */
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

/**
 * @desc        get current logged in employee
 * @route       GET /api/v1/auth/me
 * @access      Private
 */
exports.getMe = asyncHandler(async (req, res, next) => {
  const employee = await Employee.findById(req.employee.id);

  res.status(200).json({
    sucess: true,
    data: employee
  });
});

/**
 * @desc        update employee details
 * @route       PUT /api/v1/auth/updatedetails
 * @access      Private
 */
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  };

  const employee = await Employee.findByIdAndUpdate(
    req.employee.id,
    fieldsToUpdate,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: employee
  });
});

/**
 * @desc        update password
 * @route       PUT /api/v1/auth/updatepassword
 * @access      Private
 */
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const employee = await Employee.findById(req.employee.id).select('+password');

  // check current password
  if (!(await employee.matchPassword(res.body.currentPassword))) {
    return next(new ErrorResponse('Password is inncorrect', 401));
  }

  employee.password = req.body.newPassword;
  await employee.save();

  sendTokenResponse(employee, 200, res);
});

/**
 * @desc        forgot password
 * @route       POST /api/v1/auth/forgotpassword
 * @access      Public
 */
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const employee = await Employee.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  // get reset token
  const resetToken = employee.getResetPasswordToken();

  await employee.save({ validateBeforeSave: false });

  // create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please follow this link! \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: employee.email,
      subject: 'Password reset request',
      message
    });

    rest.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.log(err);
    employee.resetPasswordToken = undefined;
    employee.resetPasswordExpire = undefined;

    await employee.save({ validateBeforeSave: false });

    return next(
      new ErrorResponse(
        'Email could not be sent at this time.\n Please try again later.',
        500
      )
    );
  }
});

/**
 * @desc        reset password
 * @route       PUT /api/v1/auth/resetpassword/:resettoken
 * @access      Public
 */
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const employee = await Employee.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!employee) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  // set new password
  employee.password = req.body.password;
  employee.resetPasswordToken = undefined;
  employee.resetPasswordExpire = undefined;
  await employee.save();

  sendTokenResponse(employee, 200, res);
});

// get token from model, create cookie and send response
const sendTokenResponse = (employee, statusCode, res) => {
  // create token
  const token = employee.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    });
};
