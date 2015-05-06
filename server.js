'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/freelanceDatabase');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//var userRoute = require('./routes/users.route')//(app);
require('./routes/comments.route')(app);
require('./routes/developers.route')(app);
require('./routes/jobs.route')(app);
require('./routes/tags.route')(app);
require('./routes/technologies.route')(app);
require('./routes/users.route')(app);

//app.use('/users', userRoute);


app.listen((process.env.PORT || 3000), function(){
  //var port = app.address().port;
 // var address  =app.address().address;
  console.log('Server started successfully at port:', '3000');
});

module.exports = app;
