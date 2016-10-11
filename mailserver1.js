
var express = require("express");
var app = express();
var helper = require('sendgrid').mail;
var bodyParser = require('body-parser');
//app.use(express.json());       // to support JSON-encoded bodies
//app.use(express.urlencoded()); 
//app.use(express.bodyParser());
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/',function(req,res) {
    
    console.log("Inside Mailserver1/Sendgrid get method");
/*    if (req.method == 'POST') {
    console.log("[200] " + req.method + " to " + req.url);
      
    req.on('data', function(chunk) {
      console.log("Received body data:");
      console.log(chunk.toString());
      //      console.log(chunk);
	//	console.log(chunk.formData.sender);	

		//console.log(chunk.formData);	
      // console.log("req object values in sendgrid="+ req.body.formData.sender); 

    	//console.log("req object values in sendgrid="+ req.param.sender);

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
  //console.log("req object values in mailgun="+ req.formData.sender);
 
   console.log("req object values in Sengrid="+ req.body.sender);
 	
 //   console.log("req object values in sendgrid="+ req.param.sender + req.param.receiver + req.param.subject + req.param.content);
   from_email = new helper.Email(req.body.sender);
 //   from_email = new helper.Email("aniketpsavanand@gmail.com");
	to_email = new helper.Email(req.body.receiver);
//	to_email = new helper.Email("thoraniket@gmail.com");
	subject = req.body.subject;
//	subject = "Test Subject From Sendgrid";
	content = new helper.Content('text/plain', req.body.content);
	//content = new helper.Content('text/plain', "Test Content from Sendgrid");

	mail = new helper.Mail(from_email, subject, to_email, content);
	var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
	var request = sg.emptyRequest({
	  method: 'POST',
	  path: '/v3/mail/send',
	  body: mail.toJSON(),
	});

	sg.API(request, function(error, response) {
	 console.log("Using Mailserver1/Sendgrid to send email");
	  console.log(response.statusCode);
	  console.log(response.body);
	  console.log(response.headers);
	});
});


console.log("Mailserver1/Sendgrid running on 8001");

app.listen(8001);
