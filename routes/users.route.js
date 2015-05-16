'use strict';
var express = require('express');
var ctrl = require('../controllers/users.controllers');
var auth = require('../controllers/auth.controllers');
var router = express.Router();

module.exports = function(app) {
  router.route('/users/login')
    .post(ctrl.loginUser);

  router.route('/users')
    .get(auth.authAdmin, ctrl.viewUsers)
    .post(ctrl.createUser)
    .delete(auth.authAdmin, ctrl.deleteUsers);

  router.route('/users/one')
    .get(auth.verifyToken, ctrl.viewOneUser)
    .put(auth.verifyToken, ctrl.updateUser)
    .delete(auth.verifyToken, ctrl.deleteOneUser);

  app.use('/api/v1', router);
};

