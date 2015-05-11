'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var commentSchema = new Schema({
  title: {
    type: String,
    required: 'Name must be present'
  },
  content: {
    type: String
  },
  url: {
    type: String
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: 'jobs'
  }
});

mongoose.model('Comments', commentSchema);

