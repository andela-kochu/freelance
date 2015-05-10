'use strict';

require('../models/users.models');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('Users');

module.exports = function(app, passport){
   function linkedinSignInCallback(req, res, next) {
    passport = req._passport.instance;
    passport.authenticate('linkedin', function(err, user) {
      if(err) {
        return next(err);
      }
      if(!user) {
        return res.redirect('http://localhost:8000');
      }
      console.log(user)
      User.findOne({'linkedId': user.id}, function(err,usr) {
       //console.log(usr)
       //Just learning how this works
        res.writeHead(302, {
          'Location': 'http://localhost:8000/#/index?token=' + user.accessToken + '&user=' + usr.emailAddress
        });
        res.end();
      });
    })(req,res,next);
  };
  router.route('/auth/linkedin/callback')
    .get(linkedinSignInCallback);

  router.route('/auth/linkedin')
    .get(passport.authenticate('linkedin'));

  app.use('/api/v1', router);

};

