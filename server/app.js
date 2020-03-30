/**
 * Title: Server/app.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

// route files
const employeeRoutes = require('./routes/employee');
const taskRoutes = require('./routes/task');
// express init
const app = express();

// Load env variables
dotenv.config({ path: './server/config/config.env' });

// mongoose connection to database
connectDB();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join('Server/images')));
app.use(cors());
// cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  // allow for these HTTP methods
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// express + routes
app.use('/api/v2', employeeRoutes);
app.use('/api/v2/task', taskRoutes);

module.exports = app;
