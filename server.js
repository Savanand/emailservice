
var express = require('express');
var app = express();

var mongojs = require('mongojs');
 var db = mongojs('emaillist', ['emaillist']);
var bodyParser = require('body-parser');

var loadBalancer = 'http://localhost:4000';

var request= require('request');

app.use(express.static(__dirname + "/public"))
app.use(bodyParser.json());
app.get('/emaillist', function(req, res){
	console.log("I received a get request");
		db.emaillist.find(function(err, docs){
	 	console.log(docs);
	 	res.json(docs);
	 });
});

app.post('/emaillist', function(req, res){

	console.log('redirecting to loadbalancer');
	console.log(req.body);

    var request = require('request');
/*  	request.post({
	  	url:'http://localhost:4000',
	  	formData: req.body
		}, function(error, response, body) {
			console.log(body);
	});
	*/
 	request.post({
	  	url:'http://localhost:4000',
	  	body: req.body,
	  	json: true
		}, function(error, response, body) {
			console.log(body);
	});

	console.log("in function after post in loadbalancer"); 

	db.emaillist.insert(req.body, function(err, doc){
	res.json(doc);
	 });

});

app.delete('/emaillist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.emaillist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	 });
});

app.listen(3000);
console.log("server running on port 3000");
