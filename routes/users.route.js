'use strict';

module.exports = function(app){
  var  method = require('../controllers/users.controllers');

  app.post('/create-user', method.createUser);
  app.get('/view-user', method.viewUsers);
  app.get('/view-user/:_id', method.viewOneUser);
  app.put('/update-user/:_id', method.updateUser);
  app.delete('/delete-user', method.deleteUsers);
  app.delete('/delete-user/:_id', method.deleteOneUser);
};
