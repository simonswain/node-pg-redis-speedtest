var fs = require('fs');

module.exports = function(done) {

  var db = require('../lib/db.js');
  var schema = fs.readFileSync ( __dirname + '/../db/schema.sql', 'ascii');

  db.conn(
    function(err, conn){
      conn.query(schema, function(err, res){
        if(err){
          console.log(err);
          process.exit(0);
        }
        conn.end();
        done();
      });
    });
};
