'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var techSchema = new Schema({
  name: {
    type: String,
    required: 'Name must be present'
  },
  url: {
    type: String
  },
  jobs:[{}]
});

mongoose.model('Technologies', techSchema);

