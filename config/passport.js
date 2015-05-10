'use strict';

var mongoose = require('mongoose'),
    passport = require('passport'),
    LinkedInStrategy = require('passport-linkedin-oauth2').Strategy,
    User = mongoose.model('Users');

module.exports = function() {
    //Serialize sessions
/*    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({ttp://localhost:3000/api/v1/auth/linkedin/callback
            _id: id
        }, function(err, user) {
            done(err, user);
        });
    });
*/
    //linkendin
    passport.use(new LinkedInStrategy({
        clientID: '77x4iyq8ntpmlf',
        clientSecret: 'ZJGdyoWS0E7jjat5',
        callbackURL: '/api/v1/auth/linkedin/callback',
        scope: ['r_emailaddress', 'r_basicprofile'],
        passReqToCallback: true,
        state: true
       },
      function(req, accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        profile.accessToken = accessToken;
        process.nextTick(function () {
            console.log(profile.id)
            User.findOne({'linkedId': profile.id}, function(err, user){
              if (err){
                console.log('err');
                return done(err);
              }
                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                }
                else {
                    // if there is no user found with that facebook id, create them
                    User.create({
                      name: profile.displayName,
                      emailAddress: profile.emails[0].value,
                      linkedId: profile.id
                    }, function(err, user){
                      if(err){
                        console.log('Could not create user');
                      }
                      console.log(user)
                        return done(null, user);
                    });
                };
            });
          });
        }
    ));
};
