const express = require('express')

const router = express.Router()

router.post((req,res,next)=>{
    res.send('<h1> Hello Dennis <h/>')

})

module.exports=router 