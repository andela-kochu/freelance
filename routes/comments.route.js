'use strict';

var express = require('express');
var ctrl = require('../controllers/comments.controllers');
var router = express.Router();

module.exports = function(app) {
  router.route('/comments')
    .get(ctrl.viewComments)
    .post(ctrl.createComment)
    .delete(ctrl.deleteComments);

  router.route('/comments/:id')
    .delete(ctrl.deleteOneComment);
  app.use('/api/v1', router);
};

