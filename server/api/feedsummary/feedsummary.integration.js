'use strict';

var app = require('../..');
import request from 'supertest';

var newFeedsummary;

describe('Feedsummary API:', function() {
  describe('GET /api/feedsummarys', function() {
    var feedsummarys;

    beforeEach(function(done) {
      request(app)
        .get('/api/feedsummarys')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          feedsummarys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      feedsummarys.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/feedsummarys', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/feedsummarys')
        .send({
          name: 'New Feedsummary',
          info: 'This is the brand new feedsummary!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newFeedsummary = res.body;
          done();
        });
    });

    it('should respond with the newly created feedsummary', function() {
      newFeedsummary.name.should.equal('New Feedsummary');
      newFeedsummary.info.should.equal('This is the brand new feedsummary!!!');
    });
  });

  describe('GET /api/feedsummarys/:id', function() {
    var feedsummary;

    beforeEach(function(done) {
      request(app)
        .get(`/api/feedsummarys/${newFeedsummary._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          feedsummary = res.body;
          done();
        });
    });

    afterEach(function() {
      feedsummary = {};
    });

    it('should respond with the requested feedsummary', function() {
      feedsummary.name.should.equal('New Feedsummary');
      feedsummary.info.should.equal('This is the brand new feedsummary!!!');
    });
  });

  describe('PUT /api/feedsummarys/:id', function() {
    var updatedFeedsummary;

    beforeEach(function(done) {
      request(app)
        .put(`/api/feedsummarys/${newFeedsummary._id}`)
        .send({
          name: 'Updated Feedsummary',
          info: 'This is the updated feedsummary!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedFeedsummary = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFeedsummary = {};
    });

    it('should respond with the updated feedsummary', function() {
      updatedFeedsummary.name.should.equal('Updated Feedsummary');
      updatedFeedsummary.info.should.equal('This is the updated feedsummary!!!');
    });

    it('should respond with the updated feedsummary on a subsequent GET', function(done) {
      request(app)
        .get(`/api/feedsummarys/${newFeedsummary._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let feedsummary = res.body;

          feedsummary.name.should.equal('Updated Feedsummary');
          feedsummary.info.should.equal('This is the updated feedsummary!!!');

          done();
        });
    });
  });

  describe('PATCH /api/feedsummarys/:id', function() {
    var patchedFeedsummary;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/feedsummarys/${newFeedsummary._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Feedsummary' },
          { op: 'replace', path: '/info', value: 'This is the patched feedsummary!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedFeedsummary = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedFeedsummary = {};
    });

    it('should respond with the patched feedsummary', function() {
      patchedFeedsummary.name.should.equal('Patched Feedsummary');
      patchedFeedsummary.info.should.equal('This is the patched feedsummary!!!');
    });
  });

  describe('DELETE /api/feedsummarys/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/feedsummarys/${newFeedsummary._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when feedsummary does not exist', function(done) {
      request(app)
        .delete(`/api/feedsummarys/${newFeedsummary._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
