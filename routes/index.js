'use strict';

module.exports = function(app, passport) {
  require('./auth.route')(app, passport);
  require('./comments.route')(app);
  require('./developers.route')(app);
  require('./jobs.route')(app);
  require('./tags.route')(app);
  require('./technologies.route')(app);
  require('./users.route')(app);
};
