'use strict';

var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
  var db  = mongoose.connect(process.env.MONGOLAB_URI);
  require('../models/users.models');
  return db;
};
