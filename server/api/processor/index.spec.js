'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var processorCtrlStub = {
  index: 'processorCtrl.index',
  show: 'processorCtrl.show',
  create: 'processorCtrl.create',
  upsert: 'processorCtrl.upsert',
  patch: 'processorCtrl.patch',
  destroy: 'processorCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var processorIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './processor.controller': processorCtrlStub
});

describe('Processor API Router:', function() {
  it('should return an express router instance', function() {
    processorIndex.should.equal(routerStub);
  });

  describe('GET /api/processors', function() {
    it('should route to processor.controller.index', function() {
      routerStub.get
        .withArgs('/', 'processorCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/processors/:id', function() {
    it('should route to processor.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'processorCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/processors', function() {
    it('should route to processor.controller.create', function() {
      routerStub.post
        .withArgs('/', 'processorCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/processors/:id', function() {
    it('should route to processor.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'processorCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/processors/:id', function() {
    it('should route to processor.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'processorCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/processors/:id', function() {
    it('should route to processor.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'processorCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
