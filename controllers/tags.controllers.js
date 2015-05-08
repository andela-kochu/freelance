'use strict';

var mongoose = require('mongoose');
require('../models/tags.models')
var Tag = mongoose.model('Tags');

exports.createTag = function(req, res){
  Tag.create(req.body, function(err, tag){
    if(err){
      return res.json(err);
    }
    res.json(tag);
  });
};

exports.viewTags = function(req, res){
  Tag.find(function(err, tags){
    if(err){
      return res.json(err);
    }
    res.json(tags);
  });
};

exports.deleteTags = function(req, res){
  Tag.remove(function(err, tags){
    if(err){
      return res.json(err);
    }
    res.json(tags);
  });
};
exports.deleteOneTag = function(req, res){
  Tag.remove({
    _id: req.params.id
  }, function(err, tag){
    if(err){
      return res.json(err);
    }
    res.json(tag);
  });
};
