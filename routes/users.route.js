'use strict';
var express = require('express');
var ctrl = require('../controllers/users.controllers');
var router = express.Router();

module.exports = function(app) {
  router.route('/users')
    .get(ctrl.viewUsers)
    .post(ctrl.createUser)
    .delete(ctrl.deleteUsers);

  router.route('/users/:id')
    .get(ctrl.viewOneUser)
    .put(ctrl.updateUser)
    .delete(ctrl.deleteOneUser);
  app.use('/api/v1', router);
};

