var fs = require('fs')
	,path = require('path')
	,rootPath = path.join(__dirname+'../public/dropbox/');

var walkDir = function(dir, callback) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) {return callback(err,null);}
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) {return callback(null, results);}
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
        	results.push(file);
          walkDir(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};
exports.walkDir = walkDir;