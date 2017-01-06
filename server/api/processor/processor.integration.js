'use strict';

var app = require('../..');
import request from 'supertest';

var newProcessor;

describe('Processor API:', function() {
  describe('GET /api/processors', function() {
    var processors;

    beforeEach(function(done) {
      request(app)
        .get('/api/processors')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          processors = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      processors.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/processors', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/processors')
        .send({
          name: 'New Processor',
          info: 'This is the brand new processor!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newProcessor = res.body;
          done();
        });
    });

    it('should respond with the newly created processor', function() {
      newProcessor.name.should.equal('New Processor');
      newProcessor.info.should.equal('This is the brand new processor!!!');
    });
  });

  describe('GET /api/processors/:id', function() {
    var processor;

    beforeEach(function(done) {
      request(app)
        .get(`/api/processors/${newProcessor._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          processor = res.body;
          done();
        });
    });

    afterEach(function() {
      processor = {};
    });

    it('should respond with the requested processor', function() {
      processor.name.should.equal('New Processor');
      processor.info.should.equal('This is the brand new processor!!!');
    });
  });

  describe('PUT /api/processors/:id', function() {
    var updatedProcessor;

    beforeEach(function(done) {
      request(app)
        .put(`/api/processors/${newProcessor._id}`)
        .send({
          name: 'Updated Processor',
          info: 'This is the updated processor!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedProcessor = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedProcessor = {};
    });

    it('should respond with the updated processor', function() {
      updatedProcessor.name.should.equal('Updated Processor');
      updatedProcessor.info.should.equal('This is the updated processor!!!');
    });

    it('should respond with the updated processor on a subsequent GET', function(done) {
      request(app)
        .get(`/api/processors/${newProcessor._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let processor = res.body;

          processor.name.should.equal('Updated Processor');
          processor.info.should.equal('This is the updated processor!!!');

          done();
        });
    });
  });

  describe('PATCH /api/processors/:id', function() {
    var patchedProcessor;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/processors/${newProcessor._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Processor' },
          { op: 'replace', path: '/info', value: 'This is the patched processor!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedProcessor = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedProcessor = {};
    });

    it('should respond with the patched processor', function() {
      patchedProcessor.name.should.equal('Patched Processor');
      patchedProcessor.info.should.equal('This is the patched processor!!!');
    });
  });

  describe('DELETE /api/processors/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/processors/${newProcessor._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when processor does not exist', function(done) {
      request(app)
        .delete(`/api/processors/${newProcessor._id}`)
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
