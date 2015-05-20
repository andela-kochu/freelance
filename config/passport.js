'use strict';

//require('../models/users.models');
var mongoose = require('mongoose'),
    passport = require('passport'),
    LinkedInStrategy = require('passport-linkedin-oauth2').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    User = mongoose.model('Users'),
    config = require('./config');


module.exports = function() {
    //linkendin strategy
  passport.use(new LinkedInStrategy({
      clientID: '77x4iyq8ntpmlf',
      clientSecret: 'ZJGdyoWS0E7jjat5',
      callbackURL: '/api/v1/auth/linkedin/callback',
      scope: ['r_emailaddress', 'r_basicprofile'],
      passReqToCallback: true,
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
                var newUser = new User();
                newUser.name = profile._json.formattedName;
                newUser.emailAddress = profile._json.emailAddress;
                newUser.picture = profile._json.pictureUrl;
                // newUser.skill = profile._json.skills.values;
                newUser.save(function(err, user){
                  if(err){
                    console.log('Could not create user');
                  }
                  console.log(user);
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
            return done(null, user);
          }
          else {
            var newUser = new User();
              newUser.name =  profile._json.name;
              newUser.emailAddress =  profile._json.email;
              newUser.picture = profile._json.picture;
              newUser.gender =   profile._json.gender;
              newUser.save(function(err, user){
                if(err){
                  console.log('Could not create user');
                }
                return done(null, user);
              });
            }
          });
        });
      }
    ));
};
