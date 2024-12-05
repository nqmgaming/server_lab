const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const mongoose = require('./config/db')
const userRouter = require('./api/routes/users.routes');
const distributorsRouter = require('./api/routes/distributors.routes');
const fruitsRouter = require('./api/routes/fruits.routes');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// test route
app.get('/', function (req, res) {
    res.json({message: 'Hello World!'});
});

// routes
app.use('/api/users', userRouter);
app.use('/api/distributors', distributorsRouter);
app.use('/api/fruits', fruitsRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

mongoose.connect().then(() => {
    console.log('Connected to MongoDB');
    console.log(`Server is running on port ${process.env.PORT}`);
}).catch(err => {
    console.log(err);
});


// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
