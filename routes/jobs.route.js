'use strict';

module.exports = function(app){
  var  method = require('../controllers/jobs.controllers');

  app.post('/create-job', method.createJob);
  app.get('/view-job', method.viewJobs);
  app.get('/view-job/:_id', method.viewOneJob);
  app.put('/update-job/:_id', method.updateJob);
  app.delete('/delete-job', method.deleteJobs);
  app.delete('/delete-job/:_id', method.deleteOneJob);
};
