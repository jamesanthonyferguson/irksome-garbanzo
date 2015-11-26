'use strict';

var app = require('../../app');
var request = require('supertest');

describe('Meter API:', function() {

  describe('GET /api/meters', function() {
    var meters;

    beforeEach(function(done) {
      request(app)
        .get('/api/meters')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          meters = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      meters.should.be.instanceOf(Array);
    });

  });

});
