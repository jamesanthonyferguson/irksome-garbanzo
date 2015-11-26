'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var meterCtrlStub = {
  index: 'meterCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var meterIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './meter.controller': meterCtrlStub
});

describe('Meter API Router:', function() {

  it('should return an express router instance', function() {
    meterIndex.should.equal(routerStub);
  });

  describe('GET /api/meters', function() {

    it('should route to meter.controller.index', function() {
      routerStub.get
                .withArgs('/', 'meterCtrl.index')
                .should.have.been.calledOnce;
    });

  });

});
