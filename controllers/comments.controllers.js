'use strict';

require('../models/comments.models');
require('../models/jobs.models');
var mongoose = require('mongoose'),
    Comment = mongoose.model('Comments'),
    Job = mongoose.model('Jobs');

exports.createComment = function(req, res) {
  Comment.create(req.body, function(err, comment) {
    if(err){
      return res.status(400).json(err);
    }
    Job.findOne({
    '_id': comment.jobId
    },
    function(err, job) {
      if(err){
        return res.json(err);
      }
      job.postComment(comment._id,
        function(err, job){
          if (err) {
            return res.status(401).json(err);
          }
          return res.status(200).json(job);
        });
      });
    return res.status(200).json(comment);
  });
};

exports.viewComments = function(req, res) {
  Comment.find(function(err, comments) {
    if(err){
      return res.status(400).json(err);
    }
    return res.status(200).json(comments);
  });
};

exports.deleteComments = function(req, res) {
  Comment.remove(function(err, comments) {
    if(err){
      return res.status(400).json(err);
    }
    return res.status(200).json(comments);
  });
};
exports.deleteOneComment = function(req, res) {
  Comment.remove({
    _id: req.params.id
  }, function(err, comment) {
    if(err){
      return res.json(err);
    }
    return res.status(200).json(comment);
  });
};
