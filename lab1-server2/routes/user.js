var  express = require('express')
	,router = express.Router()
	,jwt    = require('jsonwebtoken') // used to create, sign, and verify tokens
	,session = require('./session')
	,passport = require("passport")
	,databaseOperation = require('./databaseOperation')
	,bcrypt = require('bcrypt')
	,salt = bcrypt.genSaltSync(10)
	,getUserData = require('./getUserData')
	,uploadData = require('./uploadData')
	, path = require('path');

passport.use(session.strategy);

router.get('/getUsers',passport.authenticate('jwt', { session: false }), function(req, res){
	var fetchUserQuery = "select id,firstname,lastname,email from users";	
	  databaseOperation.executeQuery(fetchUserQuery,processResult);
		function processResult(err,data){
			if(err){
				throw err;
			}
			else
				{
				res.json({accounts:data});
				}				
		} 
	});

router.post('/signUp',function (req, res, next) {
	console.log("req received",req.body);
	var insertUserQuery = "INSERT INTO users (firstname,lastname,email,password) VALUES('"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.email+"','"+bcrypt.hashSync(req.body.password, salt)+"')";	
	  databaseOperation.executeQuery(insertUserQuery,processResult);
		function processResult(err,data){
			if(err){
				throw err;
			}
			else
				{ 
				uploadData.createFolder(data[0].id,function handleError(err){
				if(err){console.log("User directory creation failed");}	
				});
				res.json({token: jwt.sign({id:data[0].id}, session.jwtOptions.secretOrKey)});
				}				
		} 
	});

router.post('/doLogin',function (req, res, next) {
  var fetchUserQuery = "select * from users where email='"+req.param("email")+"'";
  var directoryName = path.join(__dirname,'..','public','dropbox');
  console.log("directory",directoryName);
  databaseOperation.executeQuery(fetchUserQuery,processResult);
	function processResult(err,data){
		if(err){
			throw err;
		}
		else
			{
			if(data.length>0&&(bcrypt.compareSync(''+req.body.password,''+data[0].password))){
				console.log("data received is:",data[0]);
				getUserData.walkUserDir(data[0].id,function(err,results){
					if(err) throw err;
					else
						{
						console.log("result",results);
						res.json({user:data[0].id, token: 'jwt '+jwt.sign({id:data[0].id}, session.jwtOptions.secretOrKey),result:results});
						}});
				
			}
			else{
				res.status(401).json({message:"passwords did not match"});
			}
			}
	} 
});

module.exports = router;
