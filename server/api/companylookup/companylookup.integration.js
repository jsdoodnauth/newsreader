'use strict';

var app = require('../..');
import request from 'supertest';

var newCompanylookup;

describe('Companylookup API:', function() {
  describe('GET /api/companylookups', function() {
    var companylookups;

    beforeEach(function(done) {
      request(app)
        .get('/api/companylookups')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          companylookups = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      companylookups.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/companylookups', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/companylookups')
        .send({
          name: 'New Companylookup',
          info: 'This is the brand new companylookup!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newCompanylookup = res.body;
          done();
        });
    });

    it('should respond with the newly created companylookup', function() {
      newCompanylookup.name.should.equal('New Companylookup');
      newCompanylookup.info.should.equal('This is the brand new companylookup!!!');
    });
  });

  describe('GET /api/companylookups/:id', function() {
    var companylookup;

    beforeEach(function(done) {
      request(app)
        .get(`/api/companylookups/${newCompanylookup._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          companylookup = res.body;
          done();
        });
    });

    afterEach(function() {
      companylookup = {};
    });

    it('should respond with the requested companylookup', function() {
      companylookup.name.should.equal('New Companylookup');
      companylookup.info.should.equal('This is the brand new companylookup!!!');
    });
  });

  describe('PUT /api/companylookups/:id', function() {
    var updatedCompanylookup;

    beforeEach(function(done) {
      request(app)
        .put(`/api/companylookups/${newCompanylookup._id}`)
        .send({
          name: 'Updated Companylookup',
          info: 'This is the updated companylookup!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedCompanylookup = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCompanylookup = {};
    });

    it('should respond with the updated companylookup', function() {
      updatedCompanylookup.name.should.equal('Updated Companylookup');
      updatedCompanylookup.info.should.equal('This is the updated companylookup!!!');
    });

    it('should respond with the updated companylookup on a subsequent GET', function(done) {
      request(app)
        .get(`/api/companylookups/${newCompanylookup._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let companylookup = res.body;

          companylookup.name.should.equal('Updated Companylookup');
          companylookup.info.should.equal('This is the updated companylookup!!!');

          done();
        });
    });
  });

  describe('PATCH /api/companylookups/:id', function() {
    var patchedCompanylookup;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/companylookups/${newCompanylookup._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Companylookup' },
          { op: 'replace', path: '/info', value: 'This is the patched companylookup!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedCompanylookup = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedCompanylookup = {};
    });

    it('should respond with the patched companylookup', function() {
      patchedCompanylookup.name.should.equal('Patched Companylookup');
      patchedCompanylookup.info.should.equal('This is the patched companylookup!!!');
    });
  });

  describe('DELETE /api/companylookups/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/companylookups/${newCompanylookup._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when companylookup does not exist', function(done) {
      request(app)
        .delete(`/api/companylookups/${newCompanylookup._id}`)
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
