/**
 * Title: controllers/employee.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
const Employee = require('../models/employee');

// get current employees profile
exports.getProfile = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({
      user: req.userData.userId
    });

    if (!employee) {
      console.log(user.empid);
      return res.status(400).json({
        message: 'Bad Request: There is no profile for this employee!'
      });
    }

    // only populate from user document if profile exists
    res.json(employee.populate('user', ['empid', 'role']));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
};

exports.createProfile = async (req, res, next) => {
  const { avatarPath, name, designation } = req.body;
  const employeeFields = {
    user: req.userData.userId,
    avatarPath,
    name,
    designation
  };

  try {
    let employee = await Employee.findOneAndUpdate(
      { user: req.userData.userId },
      { $set: employeeFields },
      { new: true, upsert: true }
    );
    res.json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
};
