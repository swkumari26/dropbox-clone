var  express = require('express')
	,router = express.Router()
	,jwt    = require('jsonwebtoken') // used to create, sign, and verify tokens
	,session = require('./session')
	,passport = require("passport")
	,databaseOperation = require('./databaseOperation')
	,bcrypt = require('bcrypt')
	,salt = bcrypt.genSaltSync(10);

passport.use(session.strategy);

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
				console.log(data[0].id);
				res.json({token: jwt.sign({id:data[0].id}, session.jwtOptions.secretOrKey)});
				}
		} 
	});

router.post('/doLogin',function (req, res, next) {
  var fetchUserQuery = "select * from users where email='"+req.param("email")+"'";
  databaseOperation.executeQuery(fetchUserQuery,processResult);
	function processResult(err,data){
		if(err){
			throw err;
		}
		else
			{
			if(data.length>0&&(bcrypt.compareSync(''+req.body.password,''+data[0].password))){
				res.json({token: jwt.sign({id:data[0].id}, session.jwtOptions.secretOrKey)});
			}
			else{
				res.status(401).json({message:"passwords did not match"});
			}
			}
	} 
});

module.exports = router;
