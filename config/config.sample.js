// how many ids to create
var samples = 10;

var inject = {
  // how many samples to inject per second
  rate: 100,
  // how many seconds to inject for
  duration: 60
}

var redis = {
  host: '127.0.0.1',
  port: 6379
};

var pg = {
  host:'localhost', 
  port: 5432,
  username: '', 
  password: '', 
  database: ''
}

var db = {
  poolMin: 2,
  poolMax: 20,
  url: 'postgres://' + pg.username + ':' + pg.password + '@' + pg.host + '/' + pg.database
};

exports.sampleCount = samples;
exports.inject = inject;
exports.prefix = 'stress';
exports.db = db;
exports.redis = redis;
