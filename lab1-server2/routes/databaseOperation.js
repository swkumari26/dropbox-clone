var mysql = require('mysql');

//Connect to mysql
function connect(){
	var connection = mysql.createConnection({
	    host     : 'localhost',
	    user     : 'root',
	    password : 'vikram',
	    database : 'cmpe273lab1server2',
	    port	 : 3306
	});
	return connection;
}


exports.executeQuery=function(sqlQuery,callback){
	
	console.log("\nSQL Query::"+sqlQuery);
	var connection = connect();
	connection.query(sqlQuery, function(err, data) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			connection.query("select last_insert_id() as id", function(err, data1) {
				if(err){
					console.log("ERROR: " + err.message);
				}
				else
					{
					if(data[0]) data[0].id=data1[0].id;
					else data=data1;
					callback(err, data);
					}
				console.log("\nConnection closed..");
				connection.end();
			});
		}
	});
};	