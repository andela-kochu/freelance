'use strict';

var mongoose = require('mongoose');
require('../models/comments.models')
var Comment = mongoose.model('Comments');

exports.createComment = function(req, res){
  Comment.create(req.body, function(err, comment){
    if(err){
      return res.json(err);
    }
    res.json(comment);
  });
};

exports.viewComments = function(req, res){
  Comment.find(function(err, comments){
    if(err){
      return res.json(err);
    }
    res.json(comments);
  });
};

exports.deleteComments = function(req, res){
  Comment.remove(function(err, comments){
    if(err){
      return res.json(err);
    }
    res.json(comments);
  });
};
exports.deleteOneComment = function(req, res){
  Comment.remove({
    _id: req.params.id
  }, function(err, comment){
    if(err){
      return res.json(err);
    }
    res.json(comment);
  });
};
