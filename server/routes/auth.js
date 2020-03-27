/**
 * Title: routes/auth.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
const express = require('express');
const AuthController = require('../controllers/auth');
const router = express.Router();

// register
router.post('/register', AuthController.register);
// login
router.post('/login', AuthController.login);

module.exports = router;
