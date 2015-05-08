'use strict';

  var  method = require('../controllers/jobs.controllers');
module.exports = function(app){

  app.post('/create-job', method.createJob);
  app.get('/view-job', method.viewJobs);
  app.get('/view-job/:id', method.viewOneJob);
  app.put('/update-job/:id', method.updateJob);
  app.delete('/delete-job', method.deleteJobs);
  app.delete('/delete-job/:id', method.deleteOneJob);
};
