'use strict';

var app = require('../../app');
require('../../models/users.models');
var request = require('supertest')(app),
  mongoose = require('mongoose'),
  User = mongoose.model('Users');

describe('Freelance App Routes', function(){

  it('should Test GET method for /api/v1/users', function(done){
    request
    .get('/api/v1/users')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end(function(err, res){
      expect(err).toBeNull();
      expect(res.body).not.toBeNull();
      done();
    });
  });

  it('should Test POST method for /api/v1/users', function(done){
  var newUser = {name: 'Chitech Ochu', emailAddress: 'kingsley@andela.co'};
    request
      .post('/api/v1/users')
      .send(newUser)
      .expect(200)
      .end(function(err, res){
        expect(err).toBeNull();
        expect(res.body).not.toBeNull();
        done();
    });
  });

  it('should Test PUT method for /api/v1/users/:id', function(done){
    var editedUser = {name: 'Edited Chitech', emailAddress: 'email@andela.co'};
    request
      .get('/api/v1/users')
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err);
        }
        request
          .put('/api/v1/users/' + res.body[0]._id)
          .send(editedUser)
          .expect(200)
          .end(function(err, res){
            expect(err).toBeNull();
            expect(res.body).not.toBeNull();
            done();
        });
    });
  });
  it('should Test DELETE method for /api/v1/users/:id', function(done){
    var editedUser = {name: 'Edited Chitech', emailAddress: 'email@andela.co'};
    request
      .get('/api/v1/users')
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err);
        }
        request
          .delete('/api/v1/users/' + res.body[0]._id)
          .send(editedUser)
          .expect(200)
          .end(function(err, res){
            expect(err).toBeNull();
            expect(res.body).not.toBeNull();
            done();
        });
    });
  });
    it('should not be able to create a user if the data is not sufficient', function(done) {
    var newUser = {name: 'Chitech Ochu'};
    request
      .post('/api/v1/users')
      .send(newUser)
      .expect(401)
      .end(function(err, res) {
        expect(err).not.toBeNull();
        expect(res.body.message).toMatch('validation');
        done();
      });
  });
});
