'use strict';

var mongodb = require('mongodb').MongoClient;

exports.register = function (plugin, opts, next) {
  opts = opts || {};
  opts.url = opts.url || 'mongodb://localhost:27017/test';

  mongodb.connect(opts.url, function (err, db) {
    if (err) {
      plugin.log(['hapi-mongodb2', 'error'], 'Error connection to MongoDB database');
      console.error(err);
      return next(err);
    }

    plugin.log(['hapi-mongodb2', 'info'], 'Successfully connected to MongoDB datastore');
    plugin.expose('client', db);
    plugin.expose('lib', mongodb);

    plugin.bind({ mongo: db });
    next();
  });
};

exports.register.attributes = {
  pkg: require('./package.json')
};
