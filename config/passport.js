'use strict';

//require('../models/users.models');
var mongoose = require('mongoose'),
    passport = require('passport'),
    LinkedInStrategy = require('passport-linkedin-oauth2').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    User = mongoose.model('Users'),
    config = require('./config');


module.exports = function() {
  passport.use(new LinkedInStrategy({
      clientID: '77x4iyq8ntpmlf',
      clientSecret: 'ZJGdyoWS0E7jjat5',
      callbackURL: '/api/v1/auth/linkedin/callback',
      scope: ['r_emailaddress', 'r_basicprofile'],
      // passReqToCallback: true,
      state: true
    },
    function(req, accessToken, refreshToken, profile, done) {
      profile.accessToken = accessToken;
      process.nextTick(function () {
          User.findOne({emailAddress: profile._json.emailAddress}, function(err, user){
            if (err){
              return done(err);
            }
              if (user) {
                  return done(null, user);
              }
              else {
                var user = new User();
                user.name = profile._json.formattedName;
                user.emailAddress = profile._json.emailAddress;
                user.picture = profile._json.pictureUrl;
                user.skill = profile._json.skills.values;
                user.setPassword('social');
                user.save(function(err, user){
                  if(err){
                    console.log('Could not create user');
                  }
                  console.log(user)
                    return done(null, user);
                });
              }
          });
        });
      }
  ));

  // Use google strategy
  passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: '/api/v1/auth/google/callback',
    passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
      var providerData = profile._json;
      process.nextTick(function() {
        User.findOne({emailAddress: profile._json.email}, function(err, user){
          if (err){
            return done(err);
            }
          if (user) {
            var token = user.generateJWT();
            return done(null, user, token);
          }
          else {
            var user = new User();
              // User.create({
              user.name =  profile._json.name;
              user.emailAddress =  profile._json.email;
              user.picture = profile._json.picture;
              user.gender =   profile._json.gender;
              // },
              user.setPassword('social');
              user.save(function(err, user){
                if(err){
                  console.log('Could not create user');
                }
                var token = user.generateJWT();
                return done(null, user, token);
              });
            }
          });
        });
      }
    ));
};
