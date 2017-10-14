var mkdirp = require('mkdirp')
	, path = require('path')
	,express = require('express')
	,router = express.Router()
	,session = require('./session')
	,passport = require("passport")
	,getUserData = require('./getUserData')
	,multer = require('multer')
	,fs		= require('fs')
	,rimraf		= require('rimraf')
	,databaseOperation = require('./databaseOperation')
	,jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
passport.use(session.strategy);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    	var filePath = path.join(__dirname,'..','public','dropbox',''+req.body.path);
    	console.log("filepath is", filePath);
        cb(null, filePath)
    },
    filename: function (req, file, cb) {
    	var originalname = file.originalname;  	
    	filename = file.originalname;
        cb(null, filename);
    }
});

var upload = multer({storage: storage, dest: "./public/dropbox/"});


exports.createFolder = function(folderPath,callback){
	folderPath = path.join(__dirname,'../public/dropbox/'+folderPath);	
	console.log("path received",folderPath);
	mkdirp(folderPath, function (err) {
	    if (err) console.error(err)
	    else console.log('pow!')		
		callback(err);
	});	
};

router.post('/uploadFile', upload.single('myfile'), passport.authenticate('jwt', { session: false }), function(req, res){
	var directoryName = path.join(__dirname,'..','public','dropbox');
	console.log(req.body.path);
    console.log("checking user id",req.user.id);
    console.log(req.file);
    var contentPath = req.body.path+req.file.originalname;
    var filePath = path.join(__dirname,'..','public','dropbox',''+req.body.path);	 
	var insertContent = "insert into content (created_by,content_path) values ( '"+req.user.id+"','"+contentPath+"')";
		  console.log("insert query for create file",insertContent);
		  databaseOperation.executeQuery(insertContent,processResult);
			function processResult(err,data){
				if(err){
					console.log("error in creating file");
				}	
		    else 
		    {   
		    	console.log('Folder created Successfully');
				getUserData.walkUserDir(req.user.id,function(err,results){
					if(err) throw err;
					else
						{
						res.json({result:results});
						}
					});	    	
		    }	
			}		
	});

router.get('/downloadFile', function (req, res, next) {
console.log("got to endpoint");
var filePath = path.join('dropbox',''+req.body.user,''+req.body.path);
glob("public/uploads/*.pdf", function (er, files) {

    console.log("inside glob");

    console.log("inside glob file", files);
    var resArr = files.map(function (file) {
        var fileJSON = {};
        fileJSON.file = 'dropbox/'+file.split('/')[2];
        fileJSON.cols = 2  ;
        return fileJSON;
    });
    console.log("response array",resArr);
    res.status(200).send(resArr);
});
});

router.post('/createFolder', passport.authenticate('jwt', { session: false }), function(req, res){
	var directoryName = path.join(__dirname,'..','public','dropbox');
	console.log("req received",req.body);
	console.log("req",req.user);
	folderPath = path.join(__dirname,'..','public','dropbox',''+req.body.folderPath);	
	console.log("path received",folderPath);
	mkdirp(folderPath, function (err) {
	    if (err) {console.error(err);}
	    else 
	    {   
	    	var insertContent = "insert into content (created_by,content_path) values ( '"+req.user.id+"','"+req.body.folderPath+"')";
			  console.log("insert query for create file",insertContent);
			  databaseOperation.executeQuery(insertContent,processResult);
				function processResult(err,data){
					if(err){
						console.log("error in creating folder");
					}	
			    else 
			    {   
			    	console.log('Folder created Successfully');
					getUserData.walkUserDir(req.user.id,function(err,results){
						if(err) throw err;
						else
							{
							res.json({result:results});
							}
						});	    	
			    }	
				}	    	
	    }		
	});
});
router.post('/deleteFile', passport.authenticate('jwt', { session: false }), function(req, res){
	var directoryName = path.join(__dirname,'..','public','dropbox');
	console.log("req received",req.body);
	console.log("req",req.user);
	filePath = path.join(__dirname,'..','public','dropbox',''+req.user.id,''+req.body.filePath);	
	console.log("path received",filePath);
	fs.unlink(filePath, function (err) {
	    if (err) {console.error(err);}
	    else 
	    {   
	    	console.log('File deleted Successfully');
			getUserData.walkUserDir(req.user.id,function(err,results){
				if(err) throw err;
				else
					{
					console.log("result",results);
					res.json({result:results});
					}
				});	    	
	    }		
	});
});

router.post('/deleteFolder', passport.authenticate('jwt', { session: false }), function(req, res){
	var directoryName = path.join(__dirname,'..','public','dropbox');
	console.log("req received",req.body);
	console.log("req",req.user);
	folderPath = path.join(__dirname,'..','public','dropbox',''+req.body.folderPath);	
	console.log("path received",folderPath);
	rimraf(folderPath, function (err) {
	    if (err) {console.error(err);}
	    else 
	    {   
	    	console.log('Folder deleted Successfully');
			getUserData.walkUserDir(req.user.id,function(err,results){
				if(err) throw err;
				else
					{
					console.log("result",results);
					res.json({result:results});
					}
				});	    	
	    }		
	});
});

router.post('/shareContent', passport.authenticate('jwt', { session: false }), function(req, res){
	var directoryName = path.join(__dirname,'..','public','dropbox');
	console.log("req received",req.body);	
	  var insertSharedContentQuery = "insert into shared_content (shared_to_id,content_path,content_name) values ( '"+req.body.sharedto+"','"+req.body.path+"','"+req.body.name+"')";
	  console.log("insert query for shared content",insertSharedContentQuery);
	  databaseOperation.executeQuery(insertSharedContentQuery,processResult);
		function processResult(err,data){
			if(err){
				console.log("error in fetching shared content");
			}	
	    else 
	    {   
	    	console.log('Content shared Successfully');
			getUserData.walkUserDir(req.user.id,function(err,results){
				if(err) throw err;
				else
					{
					res.json({result:results});
					}
				});	    	
	    }	
	}
});

module.exports = router;