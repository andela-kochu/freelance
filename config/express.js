'use strict';

var express = require('express'),
  session = require('express-session'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  passport = require('passport');

module.exports = function() {
  var app = express();

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(methodOverride());
  app.use(session({
    secret: 'keyboard cat'
  }));
  app.use(passport.initialize());
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', "Origin, Accept, Content-Type, Access-Control-Allow-Headers, x_access_admin, Authorization, X-Requested-With");
    res.header('Access-Control-Allow-Methods', "POST, PUT, DELETE, GET");
    next();
  });
  require('./passport')();

  app.use(express.static('./public/'));

  require('../routes/index')(app, passport);
  return app;
};
