'use strict';

var express = require('express'),
    session = require('express-session'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    passport = require('passport');

module.exports = function() {
  var app = express();

  if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(methodOverride());
  app.use(session({ secret: 'keyboard cat' }));
  //app.use(passport.session());
  app.use(passport.initialize());
  //bootstrap passport config
  require('./passport')();

  app.get('/', function(request, response) {
    response.send("fdhjdfjkdfjkdfjk");
  });

  require('../routes/index')(app, passport);
  return app;
};
