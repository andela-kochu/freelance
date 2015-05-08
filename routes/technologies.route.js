'use strict';

var  ctrl = require('../controllers/technologies.controllers');

module.exports = function(app){
  router.route('/technology')
    .get(ctrl.viewTechnologies)
    .post(ctrl.createTechnology)
    .delete(ctrl.deleteTechnologies);

  router.route('/technology/:id')
    .put(ctrl.updateTechnologies)
    .delete(ctrl.deleteOneTechnology);
  app.use('/api/v1', router);
};

