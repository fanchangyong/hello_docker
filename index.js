var mongodb = require('mongodb');
var redis = require('redis');
var connect = require('connect');
var http = require('http');
var restify = require('restify');
var docker_links = require('docker-links');

var links = docker_links.parseLinks(process.env);

var redis_host = links.redis.hostname;
var redis_port = links.redis.port;
var redis_client = redis.createClient(redis_port,redis_host);

redis_client.on('error',function(){
	console.log('REDIS error:',arguments);
});

redis_client.on('connect',function(){
	console.log('REDIS connect:',arguments);
});

redis_client.on('ready',function(){
	console.log('REDIS ready:',arguments);
});

redis_client.on('idle',function(){
	console.log('REDIS idle:',arguments);
});

function get(req, res, next) {
	var key = req.params.key;
	redis_client.get(key,function(err,val){
		if(err){
			console.log('REDIS GET:',err);
			res.send('Redis error,please see the log for detail info');
		}
		else{
			if(val)
				res.send(val);
			else
				res.send("NULL");
		}
		next();
	});
}

function put(req,res,next){
	var key = req.params.key;
	var val = req.body;
	redis_client.set(key,val,function(err,msg){
		console.log('set:',arguments);
		if(!err){
			res.send('put successfully,redis: '+msg);
		}
		else{
			console.log('set err:',err);
			res.send('ERROR,see logs!');
		}
	});
}

var server = restify.createServer();
server.use(restify.bodyParser());
server.get('/:key',get);
server.put('/:key',put);

server.listen(3000, function() {
	  console.log('%s listening at %s', server.name, server.url);
});


