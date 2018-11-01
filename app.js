const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


//===CONFIGURE ENVIRONMENT===//
if (!process.env.NODE_ENV || !process.env.NODE_ENV === 'development')
  require('dotenv').config();
//========================//


//===CONNECT TO MONGODB===//
mongoose.connect(process.env.MONGODB_URI)
.then((db) => {
  console.log("Connection to MongoDB established.");
}).catch((err) => {
  console.log("Error connecting to MongoDB: ", err.message);
});
//========================//

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;