var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
const mongoDB = "mongodb://localhost:27017/movies";
const cors = require("cors");

mongoose.Promise = global.Promise;

/*
* @TODO better to use await
*/
connection = mongoose.connect(mongoDB)
    .then(() => {
        console.log('connection to mongodb worked!');
    })
    .catch((error) => {
        console.log('connection to mongodb did not work! '+ JSON.stringify(error));
    });

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(
    cors({
      origin: "http://localhost:3000", // allow just React frontend
      methods: "GET, POST, PUT, DELETE, OPTIONS",
      credentials: true, // Allow cookies and auth headers
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
