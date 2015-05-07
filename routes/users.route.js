'use strict';
var express = require('express');
var router = express.Router();
var  method = require('../controllers/users.controllers');

module.exports = function(app){
  router.route('/users')
    .get(method.viewUsers)
    .post(method.createUser)
    .delete(method.deleteUsers);

  router.route('/users/:_id')
    .get(method.viewOneUser)
    .put(method.updateUser)
    .delete(method.deleteOneUser);
  app.use('/api/v1', router);
};

