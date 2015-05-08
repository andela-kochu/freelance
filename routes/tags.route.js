'use strict';

var  ctrl = require('../controllers/tags.controllers');

module.exports = function(app){
  router.route('/tags')
    .get(ctrl.viewTags)
    .post(ctrl.createTag)
    .delete(ctrl.deleteTags);

  router.route('/tags/:id')
    .delete(ctrl.deleteOneTag);
  app.use('/api/v1', router);
};

