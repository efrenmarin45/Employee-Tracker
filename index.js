const consoleTable = require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql");
const cliArt = require("figlet");
const clear = require("clear");
const chalk = require("chalk");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Wander89!",
    database: "employee_trackerDB"
});

connection.connect(function(err) {
    if (err) throw err;

    clear();

    console.log(chalk.green(cliArt.textSync('Employee Tracker', {horizontalLayout: 'fitted'})));

    initiate();
});




function initiate(){
    inquirer
        .prompt([
            {
            name: "userSelect",
            type: "list",
            message: "Please choose from the actions listed to proceed.",
            choices: ["View an entry", "Add an entry", "Update an entry"]
            }
        ])
        .then(answer => {
            if (answer.userSelect === "View an entry"){
                viewEntry();
            }
            else if (answer.userSelect === "Add an entry"){
                addEntry();
            }
            else if (answer.userSelect === "Update an entry"){
                updateEntry();
            }
            else {
                connection.end();
            }
        });
}

function viewEntry(){
    inquirer
        .prompt([
            {
                name: "userView",
                type: "list",
                message: "What would you like to view?",
                choices: ["View departments", "View roles", "View employees", 
                "View employees by department", "View employees by role", "Return to menu"]
            }
        ])
        .then(answer => {
            if (answer.userView === "View departments"){
                viewDepartment();
            }
            else if (answer.userView === "View roles"){
                viewRoles();
            }
            else if (answer.userView === "View employees"){
                viewEmployees();
            }
            else if (answer.userView === "View employees by department"){
                employeeDepartment();
            }
            else if (answer.userView === "View employees by role"){
                employeeRole();
            }
            else if (answer.userView === "Return to menu"){
                initiate();
            }
            else{
                connection.end();
            }
        })
}

function addEntry(){
    inquirer
        .prompt([
            {
                name: "userAdd",
                type: "list",
                message: "What would you like to add?",
                choices: ["Add a department", "Add an employee", "Add a job role", "Return to menu"]
            }
        ])
        .then(answer => {
            if (answer.userAdd === "Add a department"){
                addDepartment();
            }
            else if (answer.userAdd === "Add an employee"){
                addEmployee();
            }
            else if (answer.userAdd === "Add a job role"){
                addRole();
            }
            else if (answer.userAdd === "Return to menu"){
                initiate();
            }
            else{
                connection.end();
            }
        })
}

function updateEntry(){
    inquirer
        .prompt([
            {
                name: "userUpdate",
                type: "list",
                message: "What would you like to update?",
                choices: ["Update a department", "Update an employee", "Update a job role", "Return to menu"]
            }
        ])
        .then(answer => {
            if (answer.userUpdate === "Update a department"){
                updateDepartment();
            }
            else if (answer.userUpdate === "Update an employee"){
                updateEmployee();
            }
            else if (answer.userUpdate === "Update a job role"){
                updateRole();
            }
            else if (answer.userUpdate === "Return to menu"){
                initiate();
            }
            else{
                connection.end();
            }
        })
}