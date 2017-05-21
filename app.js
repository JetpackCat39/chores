var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var login = require('./routes/login');
var newacc = require('./routes/newacc');

var database = null;

var MongoClient = require('mongodb').MongoClient;

// MongoClient.connect('mongodb://admin:password@ds149201.mlab.com:49201/taskmaster', function (err, db) {
//     if (err) throw err;
//     database = db;
//     db.collection('users').find().toArray(function (err, result) {
//         if (err) throw err;
//
//         result.push({'name': 'test', 'email': 'onetwo', 'password': 'three', 'level': 'subordinate'});
//         console.log(result)
//     })
// });

var loggedIn = false;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if(loggedIn === false) {
    app.use('/', login);
} else {
    app.use('/', newacc);
}
// login();
app.use('/login', login);
app.use('/newacc', newacc);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

function getByValue(arr, value) {

    for (var i=0, iLen=arr.length; i<iLen; i++) {

        if (arr[i].email === value) return arr[i];
    }
}

function login() {
    loggedIn = true;
}
