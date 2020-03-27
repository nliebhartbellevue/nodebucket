/**
 * Title: Server/app.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// route files
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employee');
// express init
const app = express();

// mongoose connection to database
mongoose
  .connect(
    'mongodb://dbAdmin:xh3cyH4d32@ds137801.mlab.com:37801/nodebucket-db-prod'
  )
  .then(() => {
    console.log('Conneted to database!');
  })
  .catch(() => {
    console.log('Connection to database failed!');
  });

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('Server/images')));

// cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// express + routes
app.use('/api/v2/auth', authRoutes);
app.use('/api/v2/employee', employeeRoutes);

module.exports = app;
