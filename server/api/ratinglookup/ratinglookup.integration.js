'use strict';

var app = require('../..');
import request from 'supertest';

var newRatinglookup;

describe('Ratinglookup API:', function() {
  describe('GET /api/ratinglookups', function() {
    var ratinglookups;

    beforeEach(function(done) {
      request(app)
        .get('/api/ratinglookups')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          ratinglookups = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      ratinglookups.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/ratinglookups', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/ratinglookups')
        .send({
          name: 'New Ratinglookup',
          info: 'This is the brand new ratinglookup!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newRatinglookup = res.body;
          done();
        });
    });

    it('should respond with the newly created ratinglookup', function() {
      newRatinglookup.name.should.equal('New Ratinglookup');
      newRatinglookup.info.should.equal('This is the brand new ratinglookup!!!');
    });
  });

  describe('GET /api/ratinglookups/:id', function() {
    var ratinglookup;

    beforeEach(function(done) {
      request(app)
        .get(`/api/ratinglookups/${newRatinglookup._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          ratinglookup = res.body;
          done();
        });
    });

    afterEach(function() {
      ratinglookup = {};
    });

    it('should respond with the requested ratinglookup', function() {
      ratinglookup.name.should.equal('New Ratinglookup');
      ratinglookup.info.should.equal('This is the brand new ratinglookup!!!');
    });
  });

  describe('PUT /api/ratinglookups/:id', function() {
    var updatedRatinglookup;

    beforeEach(function(done) {
      request(app)
        .put(`/api/ratinglookups/${newRatinglookup._id}`)
        .send({
          name: 'Updated Ratinglookup',
          info: 'This is the updated ratinglookup!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedRatinglookup = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRatinglookup = {};
    });

    it('should respond with the updated ratinglookup', function() {
      updatedRatinglookup.name.should.equal('Updated Ratinglookup');
      updatedRatinglookup.info.should.equal('This is the updated ratinglookup!!!');
    });

    it('should respond with the updated ratinglookup on a subsequent GET', function(done) {
      request(app)
        .get(`/api/ratinglookups/${newRatinglookup._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let ratinglookup = res.body;

          ratinglookup.name.should.equal('Updated Ratinglookup');
          ratinglookup.info.should.equal('This is the updated ratinglookup!!!');

          done();
        });
    });
  });

  describe('PATCH /api/ratinglookups/:id', function() {
    var patchedRatinglookup;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/ratinglookups/${newRatinglookup._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Ratinglookup' },
          { op: 'replace', path: '/info', value: 'This is the patched ratinglookup!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedRatinglookup = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedRatinglookup = {};
    });

    it('should respond with the patched ratinglookup', function() {
      patchedRatinglookup.name.should.equal('Patched Ratinglookup');
      patchedRatinglookup.info.should.equal('This is the patched ratinglookup!!!');
    });
  });

  describe('DELETE /api/ratinglookups/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/ratinglookups/${newRatinglookup._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when ratinglookup does not exist', function(done) {
      request(app)
        .delete(`/api/ratinglookups/${newRatinglookup._id}`)
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
