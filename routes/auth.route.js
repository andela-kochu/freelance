'use strict';

require('../models/users.models');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('Users');

module.exports = function(app, passport){
    function AuthCallback(strategy){
      return function(req, res, next) {
        passport.authenticate(strategy, function(err, user, redirectURL) {
          if (err || !user) {
            return res.redirect('/#!/signin');
          }
           return res.json({token: user.generateJWT()});
            //return res.redirect(redirectURL || '/');
        })(req, res, next);
      };
    };
  router.route('/auth/linkedin/callback')
    .get(AuthCallback('linkedin'));

  router.route('/auth/linkedin')
    .get(passport.authenticate('linkedin'));

  app.use('/api/v1', router);
};

