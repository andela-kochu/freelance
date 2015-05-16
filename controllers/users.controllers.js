'use strict';

require('../models/users.models');
var mongoose = require('mongoose'),
    User = mongoose.model('Users'),
    jwt = require('jsonwebtoken');

exports.createUser = function(req, res, next) {
  if(!req.body.emailAddress || !req.body.password || !req.body.name) {
    return res.status(400).json({message: 'Please fill out all fields; name, emailAddress, password'});
  }
  User.findOne({emailAddress: req.body.emailAddress}, function(err, user){
    if (err){
      return next(err);
    }
      if (user) {
         return res.status(400).json({message: 'emailAddress already in our database, login instead'});
      }
      else {
        var user = new User();
        user.name = req.body.name;
        user.emailAddress = req.body.emailAddress;
        user.setPassword(req.body.password);
        user.save(function (err, user){
          if(err){
            return res.status(400).json(err);
          }
          return res.status(200).json({token: user.generateJWT()});
        });
      }
  });
};
exports.viewUsers = function(req, res) {
  User.find(function(err, users) {
    if(err){
      return res.status(400).json(err);
    }
    res.json(users);
  });
};
exports.viewOneUser = function(req, res) {
  User.find({
    _id: req.decoded._id
  }, function(err, users) {
    if(err){
      return res.status(400).json(err);
    }
    res.status(200).json(users);
  });
};
exports.updateUser = function(req, res) {
  User.update({
    _id: req.decoded._id
  }, req.body, function(err, user) {
    if(err){
      return res.status(400).json(err);
    }
    res.status(200).json(user);
  });
};
exports.deleteUsers = function(req, res) {
  User.remove(function(err, users) {
    if(err){
      return res.status(400).json(err);
    }
    res.status(200).json(users);
  });
};
exports.deleteOneUser = function(req, res) {
  User.remove({
    _id: req.decoded._id
  }, function(err, user) {
    if(err){
      return res.status(400).json(err);
    }
    res.status(200).json(user);
  });
};

exports.loginUser = function(req, res, next) {
  if(!req.body.emailAddress || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields; emailAddress and password'});
  }
  User.findOne({
    emailAddress: req.body.emailAddress
  }, function(err, user){
    if(err){
      return next(err);
    }
    if(user){
      if(user.validPassword(req.body.password)){
        return res.status(200).json({token: user.generateJWT()});
      }
      else {
         return res.status(401).json({message: 'Enter a valid password'});
      }
    }
  })
};
