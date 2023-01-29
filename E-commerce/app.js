const http = require("http")
const express = require('express')
const bodyPaser = require('body-parser')
const path = require('path')


const admimRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express()

app.use(bodyPaser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',admimRoutes)
app.use(shopRoutes)

app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname, 'views','404.html'))
})

const server =  http.createServer(app)
server.listen(3000)


