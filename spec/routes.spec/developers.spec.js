'use strict';

var app = require('../../server');
var request = require('supertest')(app);

describe('Freelance App Developer Routes', function(){

  it('should Test GET method for /api/v1/developers', function(done){
    request
    .get('/api/v1/developers')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end(function(err, res){
      expect(err).toBeNull();
      expect(res.body).not.toBeNull();
      done();
    });
  });

  it('should Test POST method for /api/v1/developers', function(done){
  var newDeveloper = {name: 'Chitech Ochu', emailAddress: 'kingsley@andela.co', skills: "CSS, PHP, JAVA"};
    request
      .post('/api/v1/developers')
      .send(newDeveloper)
      .expect(200)
      .end(function(err, res){
        expect(err).toBeNull();
        expect(res.body).not.toBeNull();
        done();
    });
  });

  it('should Test PUT method for /api/v1/developers/:id', function(done){
    var editedDeveloper = {name: 'Edited Chitech', emailAddress: 'email@andela.co'};
    request
      .get('/api/v1/developers')
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err);
        }
        request
          .put('/api/v1/developers/' + res.body[0]._id)
          .send(editedDeveloper)
          .expect(200)
          .end(function(err, res){
            expect(err).toBeNull();
            expect(res.body).not.toBeNull();
            done();
        });
    });
  });
  it('should Test DELETE method for /api/v1/developers/:id', function(done){
    request
      .get('/api/v1/developers')
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err);
        }
        request
          .delete('/api/v1/developers/' + res.body[0]._id)
          .expect(200)
          .end(function(err, res){
            expect(err).toBeNull();
            expect(res.body).not.toBeNull();
            done();
        });
    });
  });
    it('should not be able to create a developer if the data is not sufficient', function(done) {
    var newDeveloper = {name: 'Chitech Ochu'};
    request
      .post('/api/v1/developers')
      .send(newDeveloper)
      .expect(401)
      .end(function(err, res) {
        expect(err).not.toBeNull();
        expect(res.body.message).toMatch('validation');
        done();
      });
  });
});
