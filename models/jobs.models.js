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
  },
  user: {
    type: Schema.ObjectId,
    ref: 'Users'
  },
  comments: [{
    type:Schema.ObjectId,
    ref: 'Comments'
  }],
  tags: [{
    type:Schema.ObjectId,
    ref: 'Tags'
  }],
  technologies: [{
    type:Schema.ObjectId,
    ref: 'Technologies'
  }]
});

mongoose.model('Jobs', jobSchema);
