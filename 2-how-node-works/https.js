const http = require("https");

const twitters = ["hello", "hi", "Go home", "get back"];

function doOnincoming(req, res) {
  const response = req.url.slice(8) - 1;
  res.end(twitters[response]);

 /*   
 
 req = incoming request from the user 

 req.url = returns users url 
 req.headers = returns users headers containting meta data
 req.params = url path 
 req.query = object query 
 req,method = methods 
 req.body = body of request 
 req.is = checks if paths matches  
 
 res = userd to send response to the client 
 res.setHeader 
 res.statusCode
 res.sendFile
 res.writeHeader
 res.redirect
 res.send
 res.end = end and send response
 */
}

const server = http.createServer(doOnincoming);
