/**
 * Title: routes/auth.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket API
 */
const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

// [POST] - register
router.post('/register', register);
// [POST] - login
router.post('/login', login);
// [GET] - logout
router.get('/logout', logout);
// [GET] - profile
router.get('/me', protect, getMe);
// [PUT] - update details
router.put('/updatedetails', protect, updateDetails);
// [PUt] - update password
router.put('/updatepassword', protect, updatePassword);
// [POST] - forgot password
router.post('/forgotpassword', forgotPassword);
// [PUT] - reset password
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
