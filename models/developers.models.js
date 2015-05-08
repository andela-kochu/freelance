'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var developerSchema = new Schema({
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
  skills: {
    type: String,
    required: "Developer must have skills"
  },
  education: [],
  projects: [],
  awards: [],
  certifications: []
});

mongoose.model('Developers', developerSchema);
