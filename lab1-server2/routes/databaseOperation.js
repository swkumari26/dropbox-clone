var mysql = require('mysql');

//Connect to mysql
	var connectionPool = mysql.createPool({
		connectionLimit : 10,
	    host     : 'localhost',
	    user     : 'root',
	    password : 'vikram',
	    database : 'cmpe273lab1server2',
	    port	 : 3306
	});


exports.executeQuery=function(sqlQuery,callback){
	
	console.log("\nSQL Query::"+sqlQuery);
	connectionPool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            throw err;
          }   		
        connection.query(sqlQuery, function(err, data) {
		if(err){
			console.log("ERROR: " + err.message);
			callback(err, data);
			console.log("\nConnection released after error..");
			connection.release();				
		}
		else 
		{	// return err or result
			if(sqlQuery.indexOf('insert')>-1)
				{
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
						console.log("\nConnection released after nested query..");
						connection.release();
					});
				}
			else
				{
				callback(err, data);
				console.log("\nConnection released after success query..");
				connection.release();				
				}
		}
	});
    connection.on('error', function(err) {      
        throw err;
        return;     
  });	
});
};	