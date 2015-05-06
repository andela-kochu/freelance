'use strict';

module.exports = function(app){
  var  method = require('../controllers/developers.controllers');

  app.post('/create-developer', method.createDeveloper);
  app.get('/view-developer', method.viewDevelopers);
  app.get('/view-developer/:_id', method.viewOneDeveloper);
  app.put('/update-developer/:_id', method.updateDeveloper);
  app.delete('/delete-developer', method.deleteDevelopers);
  app.delete('/delete-developer/:_id', method.deleteOneDeveloper);
};
