'use strict';

module.exports = function(app){
  var  method = require('../controllers/tags.controllers');

  app.post('/create-tag', method.createTag);
  app.get('/view-tag', method.viewTags);
  app.delete('/delete-tag', method.deleteTags);
  app.delete('/delete-tag/:_id', method.deleteOneTag);
};
