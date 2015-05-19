'use strict';

require('../models/users.models');
var jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    User = mongoose.model('Users'),
    passport = require('passport');

exports.AuthCallback = function (strategy) {
  return function(req, res, next) {
    passport.authenticate(strategy, function(err, user) {
      if (err || !user) {
        console.log(err)
        return res.redirect('http://localhost:8000/#/signin');
      }
      var token = user.generateJWT();
      res.writeHead(301, {
        'token': token,
        'user': user.name,
        'Location': 'http://localhost:8000/#/signin?token=' + token + '&user=' + user.name,
         'Content-Type': 'text/plain'
        //add other headers here...
        });
     // res.write("Looked everywhere, but couldn't find that page at all!\n");
      res.end();
     // return res.status(200).json({token: user.generateJWT()});
    })(req, res, next);
  };
};

exports.verifyToken = function(req, res, next) {
  var token = (req.body && req.body.authorization) || req.headers["authorization"];
  if(token){
    jwt.verify(token, 'MartensiticCHITECH', function(err, payload) {
      if(err) {
        res.status(403).json({
          message: 'Enter a valid token'
        });
      }
      else {
        User.findOne({ '_id': payload._id }, function(err, user){
          if (!err) {
            req.decoded = user;
            if (!req.decoded) {
              res.end('User not found', 401);
            } else {
              return next();
            }
          }
        });
      }
    });
  }else{
    return res.status(403).json({
      message: 'Enter a token'
    });
  }
};

exports.authAdmin = function(req, res, next) {
  var adminPass = (req.body && req.body.x_access_admin) || req.headers["x_access_admin"];
  if(adminPass === 'admin'){
    return next();
  }
  else {
    res.end('You have to be an admin', 401);
  }
};
