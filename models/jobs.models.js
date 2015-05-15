'use strict';

var mongoose = require('mongoose'),
    URLSlugs = require('mongoose-url-slugs'),
    Schema = mongoose.Schema;

var jobSchema = new Schema({
  title: {
    type: String,
    required: 'title must be present'
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
  author: {
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
jobSchema.plugin(URLSlugs('title', {
      field: 'myslug'
    }
  ));

mongoose.model('Jobs', jobSchema);
