const http = require("http")

function reLsiterner (req,res){

    const url =  req.url 
    const method = req.method

    if (url === '/'){
   
        res.setHeader('content-type','text/html')
        res.write("<html>")
        res.write("<body> Hello this is infact not mu first node server! <body/>")
        res.write("<html/>")
    }


    if (url === '/message'){
        res.setHeader('content-type','text/html')
        res.write("<html>")
        res.write("<body> Hello World <body/>")
        res.write("<html/>")
    }
}

const server =  http.createServer(reLsiterner)

server.listen(3000)