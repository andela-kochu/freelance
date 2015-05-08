'use strict';

var  ctrl = require('../controllers/developers.controllers');

module.exports = function(app){
  router.route('/developers')
    .get(ctrl.viewDevelopers)
    .post(ctrl.createDeveloper)
    .delete(ctrl.deleteDevelopers);

  router.route('/developers/:id')
    .get(ctrl.viewOneDeveloper)
    .put(ctrl.updateDeveloper)
    .delete(ctrl.deleteOneDeveloper);
  app.use('/api/v1', router);
};

