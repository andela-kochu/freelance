'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var db = require('./config/mongoose')(),
    app = require('./config/express')(),
    port = process.env.PORT || 3000;

db.connection.on('error', console.error.bind(console, 'connection:error'));



app.listen(port, function(){
  console.log("server runnning at http://localhost:" + port);
});

module.exports = app;
