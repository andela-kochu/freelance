'use strict';

var app = require('../../server');
var request = require('supertest')(app);

describe('Freelance App Tech Routes', function(){

  it('should Test GET method for /api/v1/technologies', function(done){
    request
    .get('/api/v1/technologies')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end(function(err, res){
      expect(err).toBeNull();
      expect(res.body).not.toBeNull();
      done();
    });
  });

  it('should Test POST method for /api/v1/technologies', function(done){
  var newTech = {name: 'javascript', url: 'kingsley@andela.co'};
    request
      .post('/api/v1/technologies')
      .send(newTech)
      .expect(200)
      .end(function(err, res){
        expect(err).toBeNull();
        expect(res.body).not.toBeNull();
        done();
    });
  });

  it('should Test PUT method for /api/v1/technologies/:id', function(done){
    var editTech = {name: 'PHP', url: 'email@andela.co'};
    request
      .get('/api/v1/technologies')
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err);
        }
        request
          .put('/api/v1/technologies/' + res.body[0]._id)
          .send(editTech)
          .expect(200)
          .end(function(err, res){
            expect(err).toBeNull();
            expect(res.body).not.toBeNull();
            done();
        });
    });
  });
  it('should Test DELETE method for /api/v1/technologies/:id', function(done){
    request
      .get('/api/v1/technologies')
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err);
        }
        request
          .delete('/api/v1/technologies/' + res.body[0]._id)
          .expect(200)
          .end(function(err, res){
            expect(err).toBeNull();
            expect(res.body).not.toBeNull();
            done();
        });
    });
  });
    it('should not be able to create a tech if the data is not sufficient', function(done) {
    var newTech = {url: 'htttp://#'};
    request
      .post('/api/v1/technologies')
      .send(newTech)
      .expect(401)
      .end(function(err, res) {
        expect(err).not.toBeNull();
        expect(res.body.message).toMatch('validation');
        done();
      });
  });
});
