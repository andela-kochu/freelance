'use strict';

require('../models/jobs.models')
var mongoose = require('mongoose');
var Job = mongoose.model('Jobs');

exports.createJob = function(req, res) {
  Job.create(req.body, function(err, job) {
    if(err){
      return res.json(err);
    }
    res.json(job);
  });
};
exports.viewJobs = function(req, res) {
  Job.find(function(err, jobs) {
    if(err){
      return res.json(err);
    }
    res.json(jobs);
  });
};
exports.viewOneJob = function(req, res, next) {
  Job.find({
    _id: req.params.id
  }, function(err, job) {
    if(err){
      return res.json(err);
    }
    job.populate('comments', function(err, comment) {
      if (err) {
        return next(err);
      }
      return next(comment);
    });
    job.populate('tags', function(err, tag) {
      if (err) {
        return next(err);
      }
      return next(tag);
    });
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
