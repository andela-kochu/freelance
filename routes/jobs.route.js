'use strict';

var  ctrl = require('../controllers/jobs.controllers');

module.exports = function(app){
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

