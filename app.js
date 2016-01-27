var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var http = require('http');

// bind port
app.set('http_port', 8888);

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

app.use('/', routes);
app.use('/users', users);

var server = http.createServer(app);
server.listen(app.get('http_port'));
console.log('live api app listening at http://0.0.0.0:%s', app.get('http_port'));

// error Handler
app.use(logErrors);
app.use(error_500_Handler);
app.use(error_404_Handler);


function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}
function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something blew up!' });
    } else {
        next(err);
    }
}
function error_500_Handler(err, req, res, next) {
    if (req.xhr) {
        res.status(200).json({ status: 500, error: 'Something blew up!' });
    } else {
        res.status(500).end();
    }
}
function error_404_Handler(req, res) {
    if (req.xhr) {
        res.status(200).json({ status: 404, message: 'Not found!' });
    } else {
        res.status(404).end();
    }
}
