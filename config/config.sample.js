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

exports.prefix = 'stress';
exports.sampleCount = 10;
exports.db = db;
exports.redis = redis;
