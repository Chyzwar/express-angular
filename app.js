//Dependanceies
var express = require('express');
var mongoose = require('mongoose');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var passport = require('passport');

var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var authPaths = require('./middleware/auth/paths.js')

//App Initialisation
var app = express();

//Static Folder Configuration
app.use(express.static(__dirname + '/public'));

//Routers
var routes = require('./routes/index');
var auth = require('./routes/auth')(passport);

app.use('/', routes);
app.use('/auth', auth);

//DataBase connection
var mothership = mongoose.createConnection('mongodb://localhost/lugus-storage');
var ship = mongoose.createConnection('mongodb://localhost/seed-test');

//View templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


//Middleware
app.use(favicon(__dirname + '/public/assets/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


//For Authentication
app.use(cookieParser());
app.use(session({
    secret: 'SECRET TAK KURWA',
    resave: true,
    saveUninitialized: true
}));


// Using the flash middleware provided by connect-flash to store messages in session
var flash = require('connect-flash');
app.use(flash());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// Production error handler
// No stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
