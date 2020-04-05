/**
 * Title: routes/task.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth');

/**
 * @route         [POST] /api/v2/task
 * @description   create new task
 * @access        Private
 */
router.post('', auth, (req, res, next) => {
  const task = new Task({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
    assignedTo: req.body.assignedTo,
    createdBy: req.userData.empid,
    lastModifiedBy: req.userData.empid
  });
  console.log(req.userData);
  console.log(task);
  task.save().then(newTask => {
    res.status(201).json({
      message: `New task created by ${newTask.createdBy}`,
      taskId: newTask._id
    });
  });
});

/**
 * @route         [PUT] /api/v2/task
 * @description   edit task
 * @access        Private
 */
router.put('/:id', auth, (req, res, next) => {
  const task = new Task({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
    assignedTo: req.body.assignedTo
  })
  Task.updateOne({ _id: req.params.id }, task).then(result => {
    res.status(201).json({
      message: `Task ${task._id} updated successfully`,
      taskId: result._id
    })
  }).catch(e => {
    console.log("There was an Error updating " + e);
  })
});

/**
 * @route         [GET] /api/v2/task
 * @description   get all tasks
 * @access        Public
 */
router.get('', (req, res, next) => {
  Task.find().then(docs => {
    res.status(200).json({
      message: `${docs.length} tasks retrived from the database`,
      tasks: docs
    });
  });
});

/**
 * @route         [GET] /api/v2/task/emptasks/:empid
 * @description   get all tasks for an employee
 * @access        Private
 */
router.get('/emptask/:empid', (req, res, next) => {
  console.log(req.params);
  Task.find({ assignedTo: req.params.empid }).then(docs => {
    if (docs) {
      res.status(200).json({
        message: `${docs.length} tasks found for ${req.params.empid}`,
        tasks: docs
      });
    } else {
      res.status(404).json({
        message: `No tasks found at this time for Employee ${req.params.empid}`
      });
    }
  });
});

/**
 * @route         [GET] /api/v2/task/:id
 * @description   get task by id
 * @access        Public
 */
router.get('/:id', (req, res, next) => {
  Task.findById(req.params.id).then(task => {
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({
        message: `No task found with an ID of ${req.params.id}`
      });
    }
  });
});

/**
 * @route         [DELETE] /api/v2/task/:id
 * @description   delete task by id
 * @access        Private
 */
router.delete('/:id', auth, (req, res, next) => {
  Task.deleteOne({ _id: req.params.id }).then(
    task => {
      if (task.n > 0) {
        res.status(200).json({
          message: `Employee ${req.userData.empid} deleted task #${req.params.id} successfully!`
        });
      } else {
        res.status(401).json({
          message: 'Authorization needed!'
        });
      }
    }
  );
});

/**
 * @route         [PATCH] /api/v2/task/:id
 * @description   update task status and modified by
 * @access        Private
 */
router.patch('/:id', auth, (req, res, next) => {
  Task.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: req.body.status,
        lastModifiedBy: req.userData.empid
      }
    }
  ).then(task => {
    if (task.nModified > 0) {
      res.status(200).json({
        message: `Task ${req.params.id} was updated to a status of ${task.status} by ${task.lastModifiedBy}`,
        task: task
      });
    } else {
      res.status(401).json({
        message: 'Authorization needed!'
      });
    }
  });
});

module.exports = router;
