'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var jobSchema = new Schema({
  name: {
    type: String,
    required: 'Name must be present'
  },
  slug: {
    type: String,
    required: 'Job slug can not be empty'
  },
  description: {
    type: String,
  },
  url: {
    type: String
  }
});

mongoose.model('jobs', jobSchema);
