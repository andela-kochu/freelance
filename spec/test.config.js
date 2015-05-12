'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

require('../models/users.models');
require('../models/jobs.models');
require('../models/tags.models');
require('../models/comments.models');
require('../controllers/jobs.controllers');
require('../controllers/tags.controllers');
require('../controllers/users.controllers');
require('../controllers/comments.controllers');
