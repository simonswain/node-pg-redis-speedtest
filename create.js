var async = require('async');

var config = require('./config/config.js');
var db = require('./lib/db');

var samples = [];

var inject = function(key, data, done){
  client.lpush(config.prefix + ':' + key, data);
  done();
}

var destroy = function(done){
  db.pool.acquire(
    function(err, conn){
      async.series([
        function(done){
          conn.query("DELETE FROM sample", done);
        },
        function(done){
          conn.query("DELETE FROM samples", done);
        }], function(){
          db.pool.release(conn);
          done();
          
        });
    });
}

var create = function(done){

  db.pool.acquire(
    function(err, conn){

      var query = conn.query(
        "INSERT INTO sample (at) VALUES ($1) RETURNING id",
        [new Date().getTime()]
      );

      var id = false;

      query.on('row', function (row) {
        id = row.id;
      });

      query.on('end', function (row) {
        db.pool.release(conn);
        done(false, id);
      });

    });
}

var init = function(done){
  async.timesSeries(
    config.sampleCount, 
    function(err, done){
      create(function(err, id){
        console.log(id);
        samples.push(id);
        done();
      });
    }, 
    function(err){
      done();
    });
};

async.series(
  [destroy, init], 
  function(){  
    db.close();
  });
