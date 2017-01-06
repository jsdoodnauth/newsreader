'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var ratinglookupCtrlStub = {
  index: 'ratinglookupCtrl.index',
  show: 'ratinglookupCtrl.show',
  create: 'ratinglookupCtrl.create',
  upsert: 'ratinglookupCtrl.upsert',
  patch: 'ratinglookupCtrl.patch',
  destroy: 'ratinglookupCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var ratinglookupIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './ratinglookup.controller': ratinglookupCtrlStub
});

describe('Ratinglookup API Router:', function() {
  it('should return an express router instance', function() {
    ratinglookupIndex.should.equal(routerStub);
  });

  describe('GET /api/ratinglookups', function() {
    it('should route to ratinglookup.controller.index', function() {
      routerStub.get
        .withArgs('/', 'ratinglookupCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/ratinglookups/:id', function() {
    it('should route to ratinglookup.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'ratinglookupCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/ratinglookups', function() {
    it('should route to ratinglookup.controller.create', function() {
      routerStub.post
        .withArgs('/', 'ratinglookupCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/ratinglookups/:id', function() {
    it('should route to ratinglookup.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'ratinglookupCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/ratinglookups/:id', function() {
    it('should route to ratinglookup.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'ratinglookupCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/ratinglookups/:id', function() {
    it('should route to ratinglookup.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'ratinglookupCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
