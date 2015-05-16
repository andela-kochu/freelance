'use strict';

require('../models/jobs.models')
var mongoose = require('mongoose');
var Job = mongoose.model('Jobs');

exports.createJob = function(req, res) {
  Job.create({
              author: req.decoded._id,
              title: req.body.title,
              description: req.body.description,
              tools: req.body.tools
            },
            function(err, job) {
              if(err){
                return res.json(err);
              }
              return res.json(job);
            });
};
exports.viewJobs = function(req, res) {
  Job.find()
  .populate('author')
  .exec(function(err, jobs) {
    if(err){
      return res.json(err);
    }
    res.json(jobs);
  });
};
exports.viewOneJob = function(req, res, next) {
  Job.findOne({
    '_id': req.params.id
  })
  .populate('author')
  .exec(function(err, job) {
    if(err){
      return res.json(err);
    };
    return res.json(job);

  });
};
exports.viewUserJob = function(req, res, next) {
  Job.find({
    'author' : req.decoded._id
  })
  .exec(function(err, job) {
    if(err){
      return res.json(err);
    };
    return res.json(job);

  });
};
exports.updateJob = function(req, res) {
  Job.update({
    _id: req.params.id
  },  req.body, function(err, job) {
    if(err){
      return res.json(err);
    }
    res.json(job);
  });
};
exports.deleteJobs = function(req, res) {
  Job.remove(function(err, jobs) {
    if(err){
      return res.json(err);
    }
    res.json(jobs);
  });
};
exports.deleteOneJob = function(req, res) {
  Job.remove({
    _id: req.params.id
  }, function(err, job) {
    if(err){
      return res.json(err);
    }
    res.json(job);
  });
};
