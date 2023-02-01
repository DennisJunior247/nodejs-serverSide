const mysql = require('mysql2')

const pool = mysql.createConnection({
 host:'localhost',
 user:'root',
 database:'learning-node',
 password:'djnr12345'
})

module.exports = pool.promise()