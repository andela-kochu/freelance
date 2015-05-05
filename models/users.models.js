'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type: String,
    required: 'Name must be present'
  },
  emailAddress: {
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
  },
  job: [{
    type: Schema.Types.ObjectId,
    ref: 'jobs'
  }]
});

mongoose.model('users, userSchema');
