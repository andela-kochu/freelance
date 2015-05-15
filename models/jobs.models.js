'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var jobSchema = new Schema({
  name: {
    type: String,
    required: 'Name must be present'
  },
  slug: {
    type: String
  },
  description: {
    type: String,
  },
  tools: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
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
  }]
});

mongoose.model('Jobs', jobSchema);
