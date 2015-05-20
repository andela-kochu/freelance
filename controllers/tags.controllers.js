'use strict';

require('../models/tags.models');
var mongoose = require('mongoose');
var Tag = mongoose.model('Tags');

exports.createTag = function(req, res) {
  Tag.create(req.body, function(err, tag) {
    if(err){
      return res.json(err);
    }
    res.status(200).json(tag);
  });
};

exports.viewTags = function(req, res) {
  Tag.find(function(err, tags) {
    if(err){
      return res.json(err);
    }
    res.status(200).json(tags);
  });
};

exports.deleteTags = function(req, res) {
  Tag.remove(function(err, tags) {
    if(err){
      return res.json(err);
    }
    res.status(200).json(tags);
  });
};
exports.deleteOneTag = function(req, res) {
  Tag.remove({
    _id: req.params.id
  }, function(err, tag) {
    if(err){
      return res.json(err);
    }
    res.status(200).json(tag);
  });
};
