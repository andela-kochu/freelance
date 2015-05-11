'use strict';

require('../models/users.models');
var mongoose = require('mongoose'),
    User = mongoose.model('Users'),
    jwt = require('jsonwebtoken');

exports.createUser = function(req, res, next) {
  var user = new User();
  user.name = req.body.name;
  user.emailAddress = req.body.emailAddress;
  user.setPassword(req.body.password)
  user.save(function (err){
    if(err){ return next(err); }
    return res.json({token: user.generateJWT()})
  });
};
exports.viewUsers = function(req, res) {
  User.find(function(err, users) {
    if(err){
      return res.json(err);
    }
    res.json(users);
  });
};
exports.viewOneUser = function(req, res) {
  User.find({
    _id: req.params.id
  }, function(err, users) {
    if(err){
      return res.json(err);
    }
    res.json(users);
  });
};
exports.updateUser = function(req, res) {
  User.update({
    _id: req.params.id
  }, req.body, function(err, user) {
    if(err){
      return res.json(err);
    }
    res.json(user);
  });
};
exports.deleteUsers = function(req, res) {
  User.remove(function(err, users) {
    if(err){
      return res.json(err);
    }
    res.json(users);
  });
};
exports.deleteOneUser = function(req, res) {
  User.remove({
    _id: req.params.id
  }, function(err, user) {
    if(err){
      return res.json(err);
    }
    res.json(user);
  });
};

exports.loginUser = function(req, res, next) {
  if(!req.body.name || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  User.findOne({
    name: req.body.name
  }, function(err, user){
    if(err){
      return next(err);
    }
    if(user){
        if(user.validPassword(req.body.password)){
          return res.json({token: user.generateJWT()});
        }
        else {
           return res.status(401).json({message: 'Enter a valid password'});
        }
    }
  })
};
