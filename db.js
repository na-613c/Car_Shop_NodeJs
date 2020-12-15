var mysql  = require('mysql');

var config = { 
	connectionLimit : 1000, 
	connectTimeout : 60 * 60 * 1000, 
	aquireTimeout : 60 * 60 * 1000, 
	timeout : 60 * 60 * 1000,
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : 'root',
    database : '613801_shavlovskii',
    insecureAuth : true
}

var pool = mysql.createPool(config)
module.exports.pool = pool;
