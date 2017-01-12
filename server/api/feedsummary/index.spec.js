'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var feedsummaryCtrlStub = {
  index: 'feedsummaryCtrl.index',
  show: 'feedsummaryCtrl.show',
  create: 'feedsummaryCtrl.create',
  upsert: 'feedsummaryCtrl.upsert',
  patch: 'feedsummaryCtrl.patch',
  destroy: 'feedsummaryCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var feedsummaryIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './feedsummary.controller': feedsummaryCtrlStub
});

describe('Feedsummary API Router:', function() {
  it('should return an express router instance', function() {
    feedsummaryIndex.should.equal(routerStub);
  });

  describe('GET /api/feedsummarys', function() {
    it('should route to feedsummary.controller.index', function() {
      routerStub.get
        .withArgs('/', 'feedsummaryCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/feedsummarys/:id', function() {
    it('should route to feedsummary.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'feedsummaryCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/feedsummarys', function() {
    it('should route to feedsummary.controller.create', function() {
      routerStub.post
        .withArgs('/', 'feedsummaryCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/feedsummarys/:id', function() {
    it('should route to feedsummary.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'feedsummaryCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/feedsummarys/:id', function() {
    it('should route to feedsummary.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'feedsummaryCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/feedsummarys/:id', function() {
    it('should route to feedsummary.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'feedsummaryCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
