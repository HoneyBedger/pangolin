//===CONFIGURE ENVIRONMENT===//
if (!process.env.NODE_ENV || !process.env.NODE_ENV === 'development')
  require('dotenv').config();
//========================//

//===DEPENDENCIES===//
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//==================//

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
app.use(passport.initialize());

//Secure traffic only
app.all('*', (req, res, next) => {
  if (req.headers['x-forwarded-proto'] == 'https')
    res.redirect(302, 'https://' + req.hostname + req.originalUrl);
  else {
    next();
  }
});

app.use(express.static(path.join(__dirname, "client", "build")));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

module.exports = app;
