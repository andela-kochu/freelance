'use strict';
var express = require('express');
var ctrl = require('../controllers/technologies.controllers');
var auth = require('../controllers/auth.controllers');
var router = express.Router();

module.exports = function(app) {
  router.route('/technologies')
    .get(auth.verifyToken, ctrl.viewTechnologies)
    .post(auth.verifyToken, ctrl.createTechnology)
    .delete(auth.verifyToken, ctrl.deleteTechnologies);

  router.route('/technologies/:id')
    .put(auth.verifyToken, ctrl.updateTechnologies)
    .delete(auth.verifyToken, ctrl.deleteOneTechnology);
  app.use('/api/v1', router);
};

