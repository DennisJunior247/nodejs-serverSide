// const mysql = require('mysql2')


// const pool = mysql.createConnection({
//  host:'localhost',
//  user:'root',
//  database:'learning-node',
//  password:'djnr12345'
// })

// module.exports = pool.promise()

const Sequelize = require('sequelize')

const sequelize = new Sequelize('learning-node','root','djnr12345',{
    dialect:'mysql',
    host:'localhost'
})


module.exports = sequelize 