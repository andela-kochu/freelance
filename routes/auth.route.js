'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

require('../models/users.models');
var User = mongoose.model('Users');



module.exports = function(app, passport){
   function linkedinSignInCallback(req, res, next) {
    passport = req._passport.instance;
    passport.authenticate('linkedin',function(err, user, token) {
      if(err) {
        return next(err);
      }
      if(!user) {
        return res.redirect('http://localhost:8000');
      }
        return res.redirect('http://localhost:800f0');
   /*   console.log(user)
      User.findOne({'linkedId': user.id},function(err,usr) {
       console.log(usr)
       return res.writeHead(302, {
          'Location': 'http://localhost:8000/#/index?token=' + token + '&user=' + user.emailAddress
        });
       res.end();
     })*/
    })(req,res,next);
  };
  router.route('/auth/linkedin/callback')
    .get(linkedinSignInCallback);

  router.route('/auth/linkedin')
    .get(passport.authenticate('linkedin'));

  app.use('/api/v1', router);

};

