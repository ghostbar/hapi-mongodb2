/* global describe,it,beforeEach,afterEach */
'use strict';

var Hapi = require('hapi');
var assert = require('assert');

describe('Hapi plugin for MongoDB', function () {
  var server = null;

  beforeEach(function () {
    server = new Hapi.Server();
  });

  afterEach(function () {
    server = null;
  });

  it('should have connected', function (done) {
    server.register({
      register: require('../')
    }, function (err) {
      assert(err == null, 'Didn\'t connected successfully');

      done();
    });
  });

  it('should have the right parameters', function (done) {
    server.register({
      register: require('../')
    }, function () {
      var client = server.plugins['hapi-mongodb2'].client;

      assert(client.serverConfig.host === 'localhost', 'Wrong hostname');
      assert(client.serverConfig.port === 27017, 'Wrong port');

      done();
    });
  });
});
