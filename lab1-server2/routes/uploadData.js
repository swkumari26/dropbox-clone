var mkdirp = require('mkdirp')
	, path = require('path')
	,express = require('express')
	,router = express.Router()
	,session = require('./session')
	,passport = require("passport")
	,getUserData = require('./getUserData')
	,jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
passport.use(session.strategy);
exports.createFolder = function(folderPath,callback){
	folderPath = path.join(__dirname,'../public/dropbox/'+folderPath);	
	console.log("path received",folderPath);
	mkdirp(folderPath, function (err) {
	    if (err) console.error(err)
	    else console.log('pow!')		
		callback(err);
	});	
};

//router.post('/uploadFile',function (req, res, next) {
//	console.log("req received",req.body);
//	var insertUserQuery = "INSERT INTO users (firstname,lastname,email,password) VALUES('"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.email+"','"+bcrypt.hashSync(req.body.password, salt)+"')";	
//	  databaseOperation.executeQuery(insertUserQuery,processResult);
//		function processResult(err,data){
//			if(err){
//				throw err;
//			}
//			else
//				{ 
//				console.log("in user",data[0].id);
//				console.log("path in user",'../public/dropbox/'+data[0].id);
//				console.log("hello there");
//				uploadData.createFolder('../public/dropbox/'+data[0].id,function handleError(err){
//				if(err){console.log("User directory creation failed");}	
//				});
//				res.json({token: jwt.sign({id:data[0].id}, session.jwtOptions.secretOrKey)});
//				}				
//		} 
//	});

router.post('/createFolder', passport.authenticate('jwt', { session: false }), function(req, res){
	var directoryName = path.join(__dirname,'..','public','dropbox');
	console.log("req received",req.body);
	console.log("req",req.user);
	folderPath = path.join(__dirname,'..','public','dropbox',''+req.user.id,''+req.body.folderPath);	
	console.log("path received",folderPath);
	mkdirp(folderPath, function (err) {
	    if (err) {console.error(err);}
	    else 
	    {   
	    	console.log('Folder created Successfully');
			getUserData.walkDir(path.join(directoryName,''+req.user.id),function(err,results){
				if(err) throw err;
				else
					{
					var NewdirectoryName = path.join(directoryName,''+req.user.id);
					NewdirectoryName = NewdirectoryName.replace(/\\\\/g, '\\');
					for (var i=0;i<results.length;i++)
						{
						results[i] = results[i].replace(/\\\\/g, '\\');
						results[i] = results[i].replace(NewdirectoryName+'/','');
						}
					console.log("result",results);
					res.json({result:results});
					}});	    	
//	    	res.json("Folder created successfully");
	    }		
	});
	});
module.exports = router;