'use strict';
var express = require('express');
var ctrl = require('../controllers/users.controllers');
var router = express.Router();

module.exports = function(app) {
  router.route('/users/login')
    .post(ctrl.loginUser);

  router.route('/users')
    .get(ctrl.verifyToken, ctrl.viewUsers)
    .post(ctrl.createUser)
    .delete(ctrl.verifyToken, ctrl.deleteUsers);

  router.route('/users/:id')
    .get(ctrl.viewOneUser)
    .put(ctrl.updateUser)
    .delete(ctrl.deleteOneUser);


  app.use('/api/v1', router);
};

