hapi-mongodb2
=============

Hapi (^8.0) plugin for MongoDB native driver 2.0.

Register plugin
---------------

    var Hapi = require('hapi');
    var server = new Hapi.Server();

    server.register({
      register: require('hapi-mongodb2')
      opts: { url: 'mongodb://user:password@domain.tld:port/database' }
    }, function (err) {
      if (err) console.error(err);
    });

Use plugin
----------

The object returned by `MongoClient.connect` is exposed on `server.plugins['hapi-mongodb2']` and binded to the context on routes and extensions as `this.mongo`.

    server.route({
      method: 'GET',
      path: '/users',
      handler: function (request, reply) {
        var mongo = request.server.plugins['hapi-mongodb2'].client;
        mongo.collection('users').find({}).toArray(function (err, users) {
          reply(users);
        });
      }
    }, {
      method: 'GET',
      path: '/databases',
      handler: function (request, reply) {
        var mongo = this.mongo;
        mongo.admin().listDatabases(function (err, dbs) {
          reply(dbs);
        });
      }
    });
