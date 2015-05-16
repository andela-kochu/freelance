'use strict';
var express = require('express');
var ctrl = require('../controllers/jobs.controllers');
var auth = require('../controllers/auth.controllers');
var router = express.Router();

module.exports = function(app) {
  router.route('/jobs')
    .get(ctrl.viewJobs)
    .post(auth.verifyToken, ctrl.createJob)
    .delete(auth.verifyToken, ctrl.deleteJobs);

  router.route('/user/jobs')
    .get(auth.verifyToken, ctrl.viewUserJob);

  router.route('/jobs/:id')
    .get(ctrl.viewOneJob)
    .put(auth.verifyToken, ctrl.updateJob)
    .delete(auth.verifyToken, ctrl.deleteOneJob);
  app.use('/api/v1', router);
};

