'use strict';

require('../models/developers.models')
var mongoose = require('mongoose');
var Developer = mongoose.model('Developers');

exports.createDeveloper = function(req, res) {
  Developer.create(req.body, function(err, developer) {
    if(err){
      return res.json(err);
    }
    res.json(developer);
  });
};
exports.viewDevelopers = function(req, res) {
  Developer.find(function(err, developers) {
    if(err){
      return res.json(err);
    }
    res.json(developers);
  });
};
exports.viewOneDeveloper = function(req, res) {
  Developer.find({
    _id: req.params.id
  }, function(err, developers) {
    if(err){
      return res.json(err);
    }
    res.json(developers);
  });
};
exports.updateDeveloper = function(req, res) {
  Developer.update({
    _id: req.params.id
  },  req.body, function(err, developer) {
    if(err){
      return res.json(err);
    }
    res.json(developer);
  });
};
exports.deleteDevelopers = function(req, res) {
  Developer.remove(function(err, developers) {
    if(err){
      return res.json(err);
    }
    res.json(developers);
  });
};
exports.deleteOneDeveloper = function(req, res) {
  Developer.remove({
    _id: req.params.id
  }, function(err, developer) {
    if(err){
      return res.json(err);
    }
    res.json(developer);
  })
};
