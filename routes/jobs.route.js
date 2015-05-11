'use strict';
var express = require('express');
var ctrl = require('../controllers/jobs.controllers');
var router = express.Router();

module.exports = function(app) {
  router.route('/jobs')
    .get(ctrl.viewJobs)
    .post(ctrl.createJob)
    .delete(ctrl.deleteJobs);

  router.route('/jobs/:id')
    .get(ctrl.viewOneJob)
    .put(ctrl.updateJob)
    .delete(ctrl.deleteOneJob);
  app.use('/api/v1', router);
};

