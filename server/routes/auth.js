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
// is authenticated
router.get('/', AuthController.isAuthenticated);
// check if empid is available
router.post('/empid', AuthController.empidAvailable);

module.exports = router;
