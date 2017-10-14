var fs = require('fs')
	,path = require('path')
	,rootPath = path.join(__dirname+'../public/dropbox/')
	,express = require('express')
	,glob = require('glob')
	,databaseOperation = require('./databaseOperation')
	,router = express.Router();

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

exports.walkUserDir = function(dir,callback){
	var resultsSharedFinal = [];
	var directoryName = path.join(__dirname,'..','public','dropbox');
	walkDir(path.join(directoryName,''+dir),function(err,results){
		if(err) callback(err,null);
		else
		{
		var NewdirectoryName = path.join(directoryName,''+dir);
		NewdirectoryName = NewdirectoryName.replace(/\\\\/g, '\\');
		for (var i=0;i<results.length;i++)
			{
			results[i] = results[i].replace(/\\\\/g, '\\');
			results[i] = results[i].replace(NewdirectoryName+'/','');
			}
	  var fetchUserQuery = "select * from shared_content where shared_to_id='"+dir+"'";
	  console.log("fetch query for shared content",fetchUserQuery);
	  databaseOperation.executeQuery(fetchUserQuery,processResult);
		function processResult(err,data){
			if(err){
				console.log("error in fetching shared content");
				callback(err,null)
			}
			else
				{
				if(data.length>0)
					{
					function addAllShared(i){
						if(i<data.length){
							addSharedPath(data[i],function(err,resultsShared)
							{	
								resultsSharedFinal = resultsSharedFinal.concat(resultsShared);
								resultsShared = [];
								i++;
								if(i===data.length)
									{results = results.concat(resultsSharedFinal);
									callback(null,results);
									}
								else{
									addAllShared(i);
								}
							});
						}
					}
					addAllShared(0);
				}
				}
		}
		}
		});
	}
function addSharedPath(sharedRow,callback)
{	var returnResultShared = [];
	var directoryName = path.join(__dirname,'..','public','dropbox');
	console.log("data before shared walkdir",sharedRow);
	walkDir(path.join(directoryName,''+sharedRow.content_path),function(err,resultsShared){
		if(err) callback(err,null);
		else
		{
			console.log("data after walkdir shared path",sharedRow);
		var NewdirectoryName = path.join(directoryName,''+sharedRow.content_path);
		NewdirectoryName = NewdirectoryName.replace(/\\\\/g, '\\');
		for (var i=0;i<resultsShared.length;i++)
			{
			resultsShared[i] = resultsShared[i].replace(/\\\\/g, '\\');
			resultsShared[i] = resultsShared[i].replace(NewdirectoryName+'/','');
			console.log("in shared",resultsShared[i]);
			if(resultsShared[i].indexOf(sharedRow.content_name) > -1)
				returnResultShared.push(resultsShared[i]);
			}
		console.log("output from shared", returnResultShared);
		callback(null,returnResultShared);
		}
	});
}

exports.walkDir = walkDir;
//module.exports = router;