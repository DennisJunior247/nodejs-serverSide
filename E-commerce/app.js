const http = require("http")
const bodyPaser = require('body-parser')

const express = require('express')

const app = express()

app.use(bodyPaser.urlencoded({extended:false}))

app.use((req,res,next)=>{

    res.send('<h1> Hello Dennis <h/>')
    next()

})

const server =  http.createServer(app)

server.listen(3000)

// function reLsiterner (req,res){

//     const url =  req.url 
//     const method = req.method

//     if (url === '/'){
   
//         res.setHeader('content-type','text/html')
//         res.write("<html>")
//         res.write("<body> Hello this is infact not mu first node server! <body/>")
//         res.write("<html/>")
//     }


//     if (url === '/message'){
//         res.setHeader('content-type','text/html')
//         res.write("<html>")
//         res.write("<body> Hello World <body/>")
//         res.write("<html/>")
//     }
// }

