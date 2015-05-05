'use strict';

module.exports = function(app){
  var  method = require('../controllers/developers.controllers');

  app.post('/create-job', method.createDeveloper);
  app.get('/view-job', method.viewDevelopers);
  app.get('/view-job/:_id', method.viewOneDeveloper);
  app.put('/update-job/:_id', method.updateDeveloper);
  app.delete('/delete-job', method.deleteDevelopers);
  app.delete('/delete-job/:_id', method.deleteOneDeveloper);
};
