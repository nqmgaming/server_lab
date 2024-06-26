var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const mongoose = require('./config/db')
const userRotues = require('./api/routes/users.routes');
const distributorsRotues = require('./api/routes/distributors.routes');
const fruitsRotues = require('./api/routes/fruits.routes');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// test route
app.get('/', function (req, res) {
  res.json({ message: 'Hello World!' });
});

// routes
app.use('/api/users', userRotues);
app.use('/api/distributors', distributorsRotues);
app.use('/api/fruits', fruitsRotues);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

mongoose.connect().then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log(err);
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
