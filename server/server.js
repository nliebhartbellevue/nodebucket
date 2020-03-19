/**
 * Title: server.js
 * Author: Nathaniel Liebhart
 * Description: NodeBucket API
 */
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// load env
dotenv.config({ path: './config/config.env' });

// connect to mongoDB
connectDB();

// routes
const auth = require('./routes/auth');
const employees = require('./routes/employees');

// init express
const app = express();

// middleware
// body parser
app.use(express.json());
// cookie parser
app.use(cookieParser());
// logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// file uploading
app.use(fileupload());
// sanitize data
app.use(mongoSanitize());
// security headers
app.use(helmet());
// prevent XSS attacks
app.use(xss());
// rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);
// prevent http param pollution
app.use(hpp());
// cors
app.use(cors());

// express static folder
app.use(express.static(path.join(__dirname, 'public')));

// mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/employees', employees);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`.yellow
      .bold
  )
);

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
});
