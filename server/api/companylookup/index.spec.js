'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var companylookupCtrlStub = {
  index: 'companylookupCtrl.index',
  show: 'companylookupCtrl.show',
  create: 'companylookupCtrl.create',
  upsert: 'companylookupCtrl.upsert',
  patch: 'companylookupCtrl.patch',
  destroy: 'companylookupCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var companylookupIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './companylookup.controller': companylookupCtrlStub
});

describe('Companylookup API Router:', function() {
  it('should return an express router instance', function() {
    companylookupIndex.should.equal(routerStub);
  });

  describe('GET /api/companylookups', function() {
    it('should route to companylookup.controller.index', function() {
      routerStub.get
        .withArgs('/', 'companylookupCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/companylookups/:id', function() {
    it('should route to companylookup.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'companylookupCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/companylookups', function() {
    it('should route to companylookup.controller.create', function() {
      routerStub.post
        .withArgs('/', 'companylookupCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/companylookups/:id', function() {
    it('should route to companylookup.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'companylookupCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/companylookups/:id', function() {
    it('should route to companylookup.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'companylookupCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/companylookups/:id', function() {
    it('should route to companylookup.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'companylookupCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
