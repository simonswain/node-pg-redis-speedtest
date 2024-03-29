"use strict";

var anyDB = require('any-db');
var config = require( '../config/config');

var pool = anyDB.createPool(
  config.db.url, {
    min: config.db.poolMin, 
    max: config.db.poolMax, 
    onConnect: function (conn, done) { 
      done(null, conn);
    }
  }
);

var conn = function(callback) {
  return anyDB.createConnection(
    config.db.url, 
    callback
  );
};

var close = function(){
  pool.close();
};

module.exports = {
  conn: conn,
  pool: pool,
  close: close
};
