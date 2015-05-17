'use strict';

var mongoose = require('mongoose'),
    crypto = require('crypto'),
    jwt = require('jsonwebtoken'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type: String,
    required: 'Name must be present'
  },
  emailAddress: {
    type: String,
    required: 'Email address can not be empty'
  },
  phoneNumber: {
    type: Number
  },
  picture: {
    type: String
  },
  interests: {
    type: String
  },
  skill: {
    type: String
  },
  gender: {
    type: String
  },
  salt: {
    type: String
  },
  hash: {
    type: String
  },
  token: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  },
  roles: {
    type: [{
      type: String,
      enum: ['user', 'admin']
    }],
    default: ['user']
  }
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};
userSchema.methods.validPassword = function(password){
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};
userSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  var token = jwt.sign({
    _id: this._id,
    name: this.name,
    emailAddress: this.emailAddress,
    exp: parseInt(exp.getTime() / 1000),
  }, 'MartensiticCHITECH');
  this.token = token;
  return token;
};

/*userSchema.path('emailAddress').validate(function (email) {
  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email.text); // Assuming email has a text attribute
}, 'The e-mail field cannot be empty.');*/

mongoose.model('Users', userSchema);
