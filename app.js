'use strict';
var express= require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors=require('cors');
require('dotenv').config();
var app = express();
var expressJwt=require('express-jwt');
app.use(cors());
var auth=require('./routes/auth');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function(req, res, next){
  console.log(req.url, req.method);
  next();
});
app.use('/', auth);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log(err);
        res.status(err.status || 500).json(err);
    });
}



app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Application is running on port:', port);
});
