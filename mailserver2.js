
var Mailgun = require('mailgun').Mailgun;
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/',function(req,res) {

	console.log("Inside Mailserver2/Mailgun get method");
  /*
  if (req.method == 'POST') {
    console.log("[200] " + req.method + " to " + req.url);
      
    req.on('data', function(chunk) {
      console.log("Received body data:");
      console.log(chunk.toString());
     //             console.log(chunk);
   // console.log(chunk.formData.sender); 

    });
    
    req.on('end', function() {
      // empty 200 OK response for now
     // res.writeHead(200, "OK", {'Content-Type': 'text/html'});
      //res.end();
    });
    
  } else {
    console.log("[405] " + req.method + " to " + req.url);
    res.writeHead(405, "Method not supported", {'Content-Type': 'text/html'});
    res.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
  }
  */
  //console.log("req object values in mailgun="+ req.param.sender + req.param.receiver + req.param.subject + req.param.content);
  //console.log("req object values in mailgun="+ req.body.formData.sender); 

  //console.log("req object values in mailgun="+ req.param.sender);
 	var mg = new Mailgun('key');// removed key due to security concerns
	mg.sendText(req.body.sender, [req.body.receiver], req.body.subject, req.body.content, 'noreply@example.com', {},
  	
  	function(err) {
    	if (err) console.log('Oh noes: ' + err);
    	else     
    		{
    		console.log("Inside Mailserver2/Mailgun success");
    		console.log('Success');
    		}
	});

});

var port = Number(process.env.PORT || 8002);
app.listen(port);
console.log("Mailserver2/Mailgun server listening on" + port);

//console.log("Mailserver2/Mailgun running on 8002");
//app.listen(8002);
