const fs = require('fs');
const mysql = require("mysql2");
const configPath = './config.json';
const parsed = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));

const connection = mysql.createPool({
    host : parsed.host,
    user : parsed.user,
    database : parsed.database,
    password : parsed.password
});


module.exports = connection;