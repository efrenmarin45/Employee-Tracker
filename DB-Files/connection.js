const mysql = require("mysql");
const util = require("util");


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Wander89!",
    database: "employee_trackerDB"
});
connection.connect(function(err) {
    if (err) throw err;

});

connection.query = util.promisify(connection.query);

module.exports = connection;