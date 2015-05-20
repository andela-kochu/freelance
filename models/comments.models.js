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
  jobId: {
    type: Schema.Types.ObjectId,
    ref: 'Jobs'
  }
});

mongoose.model('Comments', commentSchema);

