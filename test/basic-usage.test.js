/**
 * Module dependencies
 */

var assert = require('assert');
var util = require('util');

describe('sails-hook-responsetime', function() {

  var sails;
  before(function() {
    sails = global._sails;

    // add routes
    sails.router.bind('GET /friends', function(req, res) {
      res.send('yes it worked');
    });
    sails.router.bind('POST /friends', function(req, res) {
      res.send({
        id: 7,
        firstName: 'Jimmy',
        lastName: 'Findingo'
      });
    });
    sails.router.bind('PUT /friends/1', function(req, res) {
      res.send({
        address: '751 Evergreen, Springfield'
      });
    });
    sails.router.bind('DELETE /friends/1', function(req, res) {
      res.send({
        deleted: 1
      });
    });

  });

  it('should not crash', function(done) {
    done();
  });

  describe('when doing http requests', function() {

    it('should return x-response-time for GET requests', function(done) {

      sails.request({
        url: '/friends',
        method: 'GET'
      }, function(err, response, body) {
        if (err) {
          done(err);
        }
        assert.equal(body, 'yes it worked');
        assert(response.headers['x-response-time']);
        done();

      });

    });

    it('should return x-response-time for POST requests', function(done) {

      sails.request({
        url: '/friends',
        method: 'POST'
      }, function(err, response, body) {
        if (err) {
          done(err);
        }
        assert.deepEqual(body, {
          id: 7,
          firstName: 'Jimmy',
          lastName: 'Findingo'
        });
        assert(response.headers['x-response-time']);
        done();

      });

    });

    it('should return x-response-time for PUT requests', function(done) {

      sails.request({
        url: '/friends/1',
        method: 'PUT'
      }, function(err, response, body) {
        if (err) {
          done(err);
        }
        assert.deepEqual(body, {
          address: '751 Evergreen, Springfield'
        });
        assert(response.headers['x-response-time']);
        done();

      });

    });

    it('should return x-response-time for DELETE requests', function(done) {

      sails.request({
        url: '/friends/1',
        method: 'DELETE'
      }, function(err, response, body) {
        if (err) {
          done(err);
        }
        assert.deepEqual(body, {
          deleted: 1
        });
        assert(response.headers['x-response-time']);
        done();

      });

    });

  });

  describe('when doing socket requests', function() {

    it('should return x-response-time for GET requests', function(done) {

      io.socket.get('/friends', function(data, jwr) {
        assert.equal(jwr.statusCode, 200, 'Expected 200 status code but got ' + jwr.statusCode + '\nFull JWR:' + util.inspect(jwr, false, null));
        assert.deepEqual(data, 'yes it worked');
        assert(jwr.headers['x-response-time']);
        done();
      });

    });

    it('should return x-response-time for POST requests', function(done) {
      io.socket.post('/friends', function(data, jwr) {
        assert.equal(jwr.statusCode, 200, 'Expected 200 status code but got ' + jwr.statusCode + '\nFull JWR:' + util.inspect(jwr, false, null));
        assert.deepEqual(data, {
          id: 7,
          firstName: 'Jimmy',
          lastName: 'Findingo'
        });
        assert(jwr.headers['x-response-time']);
        done();
      });
    });

    it('should return x-response-time for PUT requests', function(done) {
      io.socket.put('/friends/1', function(data, jwr) {
        assert.equal(jwr.statusCode, 200, 'Expected 200 status code but got ' + jwr.statusCode + '\nFull JWR:' + util.inspect(jwr, false, null));
        assert.deepEqual(data, {
          address: '751 Evergreen, Springfield'
        });
        assert(jwr.headers['x-response-time']);
        done();
      });

    });

    it('should return x-response-time for DELETE requests', function(done) {
      io.socket.delete('/friends/1', function(data, jwr) {
        assert.equal(jwr.statusCode, 200, 'Expected 200 status code but got ' + jwr.statusCode + '\nFull JWR:' + util.inspect(jwr, false, null));
        assert.deepEqual(data, {
          deleted: 1
        });
        assert(jwr.headers['x-response-time']);
        done();
      });

    });

  });

});
