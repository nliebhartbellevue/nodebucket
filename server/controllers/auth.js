/**
 * Title: controllers/auth.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// Register new user/employee
exports.register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      empid: req.body.empid,
      role: req.body.role,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: 'User created!',
          result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: 'System Error!'
        });
      });
  });
};

// log employee into application
exports.login = (req, res, next) => {
  let fetchedUser;
  User.findOne({ empid: req.body.empid })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Authentication Failed!'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Authentication Failed!'
        });
      }

      const payload = {
        empid: fetchedUser.empid,
        userId: fetchedUser._id,
        role: fetchedUser.role
      };

      const token = jwt.sign(payload, 'top-secret', { expiresIn: '1h' });
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Invalid Credentials!'
      });
    });
};
