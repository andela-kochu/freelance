'use strict';

var express = require('express');
var session = require('express-session');
var passport = require('passport')
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var  LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
mongoose.connect('mongodb://localhost/freelanceDatabase');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
//app.use(express.json());
app.use(session({ secret: 'keyboard cat'}));
app.use(passport.session());


require('./routes/comments.route')(app);
require('./routes/developers.route')(app);
require('./routes/jobs.route')(app);
require('./routes/tags.route')(app);
require('./routes/technologies.route')(app);
require('./routes/users.route')(app);


/*passport.serializeUser(function(profile, done) {
  done(null, profile.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({
            linkedId: id
        }, function(err, user) {
            done(err, user);
        });
});*/

require('./models/users.models');
var User = mongoose.model('Users');

var authConfig = new LinkedInStrategy({
    clientID: '77x4iyq8ntpmlf',
    clientSecret: 'ZJGdyoWS0E7jjat5',
    callbackURL: "http://localhost:3000/api/v1/auth/linkedin/callback",
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
                return done(null, user, accessToken); // user found, return that user
            }
            else {
                // if there is no user found with that facebook id, create them
                User.create({
                  name: profile.displayName,
                  emailAddress: profile.emails[0].value,
                  linkedId: profile.id
                }, function(err, usr){
                  if(err){
                    console.log('Could not create user');
                  }
                    return done(null, usr, accessToken);
               });
            };
          });
    });
  });

passport.use(authConfig);

require('./routes/auth.route')(app, passport);

module.exports = app;
