'use strict';

module.exports = function(app){
  var  method = require('../controllers/comments.controllers');

  app.post('/create-comment', method.createComment);
  app.get('/view-comment', method.viewComments);
  app.delete('/delete-comment', method.deleteComments);
  app.delete('/delete-comment/:_id', method.deleteOneComment);
};
