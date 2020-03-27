/**
 * Title: middleware/check-auth.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'top-secret');
    req.userData = {
      empid: decodedToken.empid,
      userId: decodedToken.userId,
      role: decodedToken.role
    };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authenticated!' });
  }
};
