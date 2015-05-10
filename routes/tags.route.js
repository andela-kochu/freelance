'use strict';
var express = require('express');
var ctrl = require('../controllers/tags.controllers');
var router = express.Router();

module.exports = function(app) {
  router.route('/tags')
    .get(ctrl.viewTags)
    .post(ctrl.createTag)
    .delete(ctrl.deleteTags);

  router.route('/tags/:id')
    .delete(ctrl.deleteOneTag);
  app.use('/api/v1', router);
};

