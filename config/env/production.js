'use strict';

module.exports = {
  db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://chitech:ochu@ds037407.mongolab.com:37407/heroku_app36743774'
};
