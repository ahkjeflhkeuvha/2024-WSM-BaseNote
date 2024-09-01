const mysql = require('mysql2');
const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',  
    password : '591006',
    database : 'basenote'
})

module.exports = pool;