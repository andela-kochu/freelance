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
    required: 'Email address can not be empty'
  },
  phoneNumber: {
    type: Number,
    max: 15,
    min: 11
  },
  imgUrl: {
    type: String
  },
  interests: {
    type: String
  }
});

mongoose.model('jobs, jobSchema');
