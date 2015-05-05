'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var commentSchema = new Schema({
  name: {
    type: String,
    required: 'Name must be present'
  },
  url: {
    type: String
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: 'jobs'
  }
});

mongoose.model('comments, commentSchema');

