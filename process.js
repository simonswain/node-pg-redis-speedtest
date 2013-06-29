var config = require('./config/config.js');
var db = require('./lib/db');

var redis = require('redis');
var client = redis.createClient(config.redis);

var key = 'pending';

var timeout = 10;

var insert = function(sample, done){
  var t = new Date().getTime();
  db.pool.acquire(
    function(err, conn){
      conn.query(
        "INSERT INTO samples (sample_id, at, value) VALUES ($1, $2, $3)",
        [sample.id, sample.at, sample.value],
        function(err){
          if(err){
            console.log(JSON.stringify(err));
          }
          db.pool.release(conn);
          done(new Date().getTime() - t);
        });
    });
};

var process = function(sample, done){
  insert(sample, function(time){
    //console.log((time/1000).toFixed(3), JSON.stringify(sample));    
    client.incr(config.prefix + ':processed')
    done();
  });
}

var brpop = function() {
  client.brpop(
    [config.prefix + ':' + key, timeout], 
    function(err, reply){

      if (!reply){
        // brpop timed out -- nothing in queue
        return quit();
      }

      if(err){
        return brpop();
      }

      try {
        msg = JSON.parse(reply[1]);
      } catch (e) {
        // bad json
        return brpop();
      }
      process(msg, function(err){
        brpop();
      });
    });
};


var quit = function(){
  db.close();
  client.quit();
}

var start = function(){
  brpop();
};

start();
