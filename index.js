const consoleTable = require("console-table");
const inquirer = require("inquirer");
const mysql = require("mysql");
const cliArt = require("ascii-art");

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