const mysql = require('mysql');

// Connect to database
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'password',
    database : 'reactnativeproject'
});

connection.connect( (err) => {
    if(err){
        throw err;

    }
    console.log('MySql Connected...')
});

module.exports = connection;