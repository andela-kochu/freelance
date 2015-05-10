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
  linkedId: {
    type: String
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
  password: {
    type: String
    // default: '',
    // validate: [validateLocalStrategyPassword, 'Password should be longer']
  },
  salt: {
    type: String
  }
});
/**
 * Create instance method for hashing a password
 */
userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

/**
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
  return jwt.sign({
    _id: this._id,
    name: this.name,
    exp: parseInt(exp.getTime() / 1000),
  }, 'SECRET');
};

mongoose.model('Users', userSchema);
