'use strict';

require('../models/users.models');
var mongoose = require('mongoose');
var User = mongoose.model('users');

exports.createUser = function(req, res){
  User.create(req.body, function(err, user){
    if(err){
      return res.json(err);
    }
    res.json(user);
  });
};
exports.viewUsers = function(req, res){
  User.find(function(err, users){
    if(err){
      return res.json(err);
    }
    res.json(users);
  });
};
exports.viewOneUser = function(req, res){
  User.find({
    _id: req.params._id
  }, function(err, users){
    if(err){
      return res.json(err);
    }
    res.json(users);
  });
};
exports.updateUser =function(req, res){
  User.update({
    _id: req.params._id
  }, req.body, function(err, user){
    if(err){
      return res.json(err);
    }
    res.json(user);
  });
};
exports.deleteUsers = function(req, res){
  User.remove(function(err, users){
    if(err){
      return res.json(err);
    }
    res.json(users);
  });
};
exports.deleteOneUser = function(req, res){
  User.remove({
    _id: req.params._id
  }, function(err, user){
    if(err){
      return res.json(err);
    }
    res.json(user);
  });
};
