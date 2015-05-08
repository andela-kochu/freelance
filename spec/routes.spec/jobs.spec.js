'use strict';

var app = require('../../app');
var request = require('supertest')(app);

describe('Freelance App Job Routes', function(){

  it('should Test GET method for /api/v1/jobs', function(done){
    request
    .get('/api/v1/jobs')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end(function(err, res){
      expect(err).toBeNull();
      expect(res.body).not.toBeNull();
      done();
    });
  });

  it('should Test POST method for /api/v1/jobs', function(done){
  var newJob = {name: 'javascript Game', slug: 'javascript-game', description: 'This is a nice job'};
    request
      .post('/api/v1/jobs')
      .send(newJob)
      .expect(200)
      .end(function(err, res){
        expect(err).toBeNull();
        expect(res.body).not.toBeNull();
        done();
    });
  });

  it('should Test PUT method for /api/v1/jobs/:id', function(done){
    var editJob = {name: 'PHP Game', slug: 'php-game'};
    request
      .get('/api/v1/jobs')
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err);
        }
        request
          .put('/api/v1/jobs/' + res.body[0]._id)
          .send(editJob)
          .expect(200)
          .end(function(err, res){
            expect(err).toBeNull();
            expect(res.body).not.toBeNull();
            done();
        });
    });
  });
  it('should Test DELETE method for /api/v1/jobs/:id', function(done){
    request
      .get('/api/v1/jobs')
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err);
        }
        request
          .delete('/api/v1/jobs/' + res.body[0]._id)
          .expect(200)
          .end(function(err, res){
            expect(err).toBeNull();
            expect(res.body).not.toBeNull();
            done();
        });
    });
  });
    it('should not be able to create a tech if the data is not sufficient', function(done) {
    var newJob = {description: 'THis is a job'};
    request
      .post('/api/v1/jobs')
      .send(newJob)
      .expect(401)
      .end(function(err, res) {
        expect(err).not.toBeNull();
        expect(res.body.message).toMatch('validation');
        done();
      });
  });
});
