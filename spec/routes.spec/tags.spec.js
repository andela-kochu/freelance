'use strict';

var app = require('../../server');
var request = require('supertest')(app);

describe('Freelance App Tag Routes', function(){

  it('should Test GET method for /api/v1/tags', function(done){
    request
    .get('/api/v1/tags')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end(function(err, res){
      expect(err).toBeNull();
      expect(res.body).not.toBeNull();
      done();
    });
  });

  it('should Test POST method for /api/v1/tags', function(done){
  var newTag = {name: 'New Tag'};
    request
      .post('/api/v1/tags')
      .send(newTag)
      .expect(200)
      .end(function(err, res){
        expect(err).toBeNull();
        expect(res.body).not.toBeNull();
        done();
    });
  });

  it('should Test DELETE method for /api/v1/tags/:id', function(done){
    request
      .get('/api/v1/tags')
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err);
        }
        request
          .delete('/api/v1/tags/' + res.body[0]._id)
          .expect(200)
          .end(function(err, res){
            expect(err).toBeNull();
            expect(res.body).not.toBeNull();
            done();
        });
    });
  });
    it('should not be able to create a tag if the data is not sufficient', function(done) {
    var newTag = {slug: 'nice-slug'};
    request
      .post('/api/v1/tags')
      .send(newTag)
      .expect(401)
      .end(function(err, res) {
        expect(err).not.toBeNull();
        expect(res.body.message).toMatch('validation');
        done();
      });
  });
});
