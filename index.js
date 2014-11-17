var mongodb = require('mongodb');
var redis = require('redis');

function connect_mongo(){
	var url = 'mongodb://localhost:27017/myproject';
	// Use connect method to connect to the Server
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		console.log("Connected correctly to server");

		db.close();
	});
}

function connect_redis(){
	redis.createClient();
}
