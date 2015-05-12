'use strict';

require('../models/users.models');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('Users');
var auth = require('../controllers/auth.controllers');

module.exports = function(app, passport){
  //linkedin route
  router.route('/auth/linkedin/callback')
    .get(auth.AuthCallback('linkedin'));
  router.route('/auth/linkedin')
    .get(passport.authenticate('linkedin'));

  // Setting the google oauth routes
  router.route('/auth/google/callback')
  .get(auth.AuthCallback('google'));
  router.route('/auth/google').get(passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }));
  app.use('/api/v1', router);
};

