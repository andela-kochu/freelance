'use strict';

var mongoose = require('mongoose'),
    crypto = require('crypto'),
    jwt = require('jsonwebtoken'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type: String,
    required: 'Name must be present',
    unique: "Name already exist, select a new one"
  },
  emailAddress: {
    type: String,
    required: 'Email address can not be empty',
    unique: "Name already exist, select a new one"
  },
  phoneNumber: {
    type: Number,
    max: 15,
    min: 11
  },
  imgUrl: {
    type: String
  },
  interests: {
    type: String
  },
  picture: {
    type: String
  },
  gender: {
    type: String
  },
  skills: {
    type:[Array]
  },
  salt: {
    type: String
  },
  hash: {
    type: String
  },
  token: {
    type: String
  }
});
/*
 * Create instance method for hashing a password
 */
userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

/*
 * Create instance method for validating password
 */
userSchema.methods.validPassword = function(password){
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJWT = function() {
  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  var token =jwt.sign({
    _id: this._id,
    name: this.name,
    exp: parseInt(exp.getTime() / 1000),
  }, 'MartensiticCHITECH');
  this.token = token;
  return token;
};

mongoose.model('Users', userSchema);
