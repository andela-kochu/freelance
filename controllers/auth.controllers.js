'use strict';

var jwt = require('jsonwebtoken'),
    passport = require('passport');

exports.AuthCallback = function (strategy){
  return function(req, res, next) {
    passport.authenticate(strategy, function(err, user, redirectURL) {
      if (err || !user) {
        return res.redirect('/auth/' + strategy + "/");
      }
      return res.json({token: user.generateJWT()});
        //return res.redirect(redirectURL || '/');
    })(req, res, next);
  };
};

exports.verifyToken = function(req, res, next) {
  var token = req.headers['x-access-token'];
  if(token){
    jwt.verify(token, 'MartensiticCHITECH', function(err, decoded){
      if(err){
        res.json({
          message: 'Enter a valid token'
        });
      }
      else{
        req.decoded = decoded;
        next();
      }
    });
  }else{
    return res.status(403).json({
      message: 'Enter a token'
    });
  }
};
