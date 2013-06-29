var redis = require('redis');
var async = require('async');
var random = require('random-to');

var config = require('./config/config.js');

var duration = config.inject.duration;
var rate = config.inject.rate;

var db = require('./lib/db');

var client = redis.createClient(config.redis);

var key = 'pending';

var timeTo;


var inject = function(i, done){
  var x = random.from0upto(config.sampleCount);

  var data = {
    "id": samples[x],
    "at": new Date().getTime(),
    "value": random.from1to(999)
  };

  client.lpush(
    config.prefix + ':' + key, 
    JSON.stringify(data),
    function(){
      client.incr(config.prefix + ':injected');
      done();
    }
  );

}

// main loop, called once per second
var run = function(){
  async.timesSeries(rate, inject, function(){
    duration --;
    console.log(duration, 'injected ' + rate);
    if(duration > 0){
      setTimeout(run, 1000);
    } else {
      return quit();
    }
  });
}

var fetch = function(next){

  db.pool.acquire(
    function(err, conn){

      var query = conn.query(
        "SELECT * FROM sample"
      );


      var samples = [];
      query.on('row', function (row) {
        samples.push(row.id);
      });

      query.on('end', function (row) {
        db.pool.release(conn);
        next(false, samples);
      });

    });
}

var quit = function(){
  db.close();
  client.quit();
}

var start = function(){

  fetch(function(err, s){
    samples = s;

    timeTo = new Date().getTime() + (duration * 1000);
    run();
  });


};

start();
