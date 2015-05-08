'use strict';

var app = require('../../app');
var request = require('supertest')(app);

describe('Freelance App Comment Routes', function(){

  it('should Test GET method for /api/v1/comments', function(done){
    request
    .get('/api/v1/comments')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end(function(err, res){
      expect(err).toBeNull();
      expect(res.body).not.toBeNull();
      done();
    });
  });

  it('should Test POST method for /api/v1/comments', function(done){
  var newComment = {title: 'New Comment'};
    request
      .post('/api/v1/comments')
      .send(newComment)
      .expect(200)
      .end(function(err, res){
        expect(err).toBeNull();
        expect(res.body).not.toBeNull();
        done();
    });
  });

  it('should Test DELETE method for /api/v1/comments/:id', function(done){
    request
      .get('/api/v1/comments')
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err);
        }
        request
          .delete('/api/v1/comments/' + res.body[0]._id)
          .expect(200)
          .end(function(err, res){
            expect(err).toBeNull();
            expect(res.body).not.toBeNull();
            done();
        });
    });
  });
    it('should not be able to create a tag if the data is not sufficient', function(done) {
    var newComment = {content: 'nice-slug'};
    request
      .post('/api/v1/comments')
      .send(newComment)
      .expect(401)
      .end(function(err, res) {
        expect(err).not.toBeNull();
        expect(res.body.message).toMatch('validation');
        done();
      });
  });
});
