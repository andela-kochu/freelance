'use strict';

module.exports = function(app){
  var  method = require('../controllers/technologies.controllers');

  app.post('/create-tech', method.createTechnology);
  app.get('/view-tech', method.viewTechnologies);
  app.put('/update-tech/:id', method.updateTechnologies);
  app.delete('/delete-tech/:id', method.deleteOneTechnology);
  app.delete('/delete-tech', method.deleteTechnologies);
};
