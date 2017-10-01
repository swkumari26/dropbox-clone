var   	express = require('express')
	, 	router = express.Router()
	,	jwt    = require('jsonwebtoken') // used to create, sign, and verify tokens
	,	passport = require("passport")
	,	passportJWT = require("passport-jwt")
	,	ExtractJwt = passportJWT.ExtractJwt
	,	JwtStrategy = passportJWT.Strategy
	,	jwtOptions = {}
	,	databaseOperation = require('./databaseOperation');

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'cmpe273lab1server2';

exports.strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  var fetchUserQuery = "select * from users where id='" + jwt_payload.id +"'";  
  databaseOperation.executeQuery(fetchUserQuery,processResult);
	function processResult(err,data){
		if(err){
			throw err;
		}
		else
			{
			 console.log(data);
			if(data.length>0){
			    next(null, data);				  
			}
			else{
			    next(null, false);
			}
			}
	}
});
exports.jwtOptions = jwtOptions;