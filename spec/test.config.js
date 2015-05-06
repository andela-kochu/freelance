'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

require('../models/users.models');
require('../models/jobs.models');
require('../models/tags.models');
require('../models/comments.models');
require('../models/developers.models');
require('../models/technologies.models');
require('../controllers/jobs.controllers');
require('../controllers/jobs.controllers');
require('../controllers/tags.controllers');
require('../controllers/comments.controllers');
require('../controllers/developers.controllers');
require('../controllers/technologies.controllers');
