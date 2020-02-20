const consoleTable = require("console.table");
const inquirer = require("inquirer");
const cliArt = require("figlet");
const clear = require("clear");
const chalk = require("chalk");
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

    clear();

    console.log(chalk.green(cliArt.textSync('Employee Tracker', {horizontalLayout: 'fitted'})));

    initiate();
});

connection.query = util.promisify(connection.query);


function initiate(){
    inquirer
        .prompt([
            {
            name: "userSelect",
            type: "list",
            message: "Please choose from the actions listed to proceed.",
            choices: ["View an entry", "Add an entry", "Update an entry", "Exit Menu"]
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
            else if (answer.userSelect === "Exit Menu"){
                endProgram();
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
                "View employees by department", "View employees by role", "View managers", "Return to menu"]
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
            else if (answer.userView === "View managers"){
                viewManager();
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

function addDepartment(){
    inquirer
        .prompt([
            {
                name: "userDepartment",
                type: "input",
                message: "What department would you like to add?"
            }
        ])
        .then(answer => {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.userDepartment
                },
                (err => {
                    if (err) throw err;
                    console.log("Successfully added a department.")
                    initiate();
                })
            )
        })
}

function addEmployee(){
    readRoles().then(roles => {
        const userRoleChoice = roles.map(({title: name, id: value}) => ({name, value}));
        inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "Please enter the employee's first name:"
            },
            {
                name: "lastName",
                type: "input",
                message: "Please enter the employee's last name:"
            },
            {
                name: "employeeRole",
                type: "list",
                message: "Please select the employee's job role:",
                choices: userRoleChoice
            },
            {
                name: "employeesManager",
                type: "input",
                message: "Please enter the name of this employee's manager. If none, type NONE :",
            }
        ])
        .then(answer => {
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.employeeRole,
                    manager_name: answer.employeesManager

                },
                (err => {
                    if (err) throw err;

                    console.log("Employee added succesfully!")
                    initiate();
                })
            )
            })
    })
}

function addRole(){
    readDept().then(department => {
    const getDeptChoice = department.map(({name: name, id: value}) => ({name, value}));
    inquirer
        .prompt([
            {
                name: "userRoleAdd",
                type: "input",
                message: "What is the name of the role you'd like to add?:"
            },
            {
                name: "userSalaryAdd",
                type: "input",
                message: "What is the salary for this role? Numbers only :"
            },
            {
                name: "userRoleDeptAdd",
                type: "list",
                message: "What department will this role be for?:",
                choices: getDeptChoice
            }
        ])
        .then(answer => {
            connection.query(
                "INSERT INTO roles SET ?",
                {
                    title: answer.userRoleAdd,
                    salary: answer.userSalaryAdd,
                    department_id: answer.getDeptChoice
                },
                (err => {
                    if (err) throw err;

                    console.log("New role successfully added!")
                    initiate();
                })
            )
        })
    })    
}












function readRoles(){
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM roles;",
        function (err, res){
            if(err) reject (err);
            resolve(res);
        })
    })
}

function readDept(){
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM department;",
        function (err, res){
            if(err) reject (err);
            resolve(res);
        })
    })
}










function viewDepartment(){
        connection.query("SELECT * FROM department;",
        async function (err, res){
            try {
                if (err) throw err;
                console.table("department", res);
                await initiate();
            }
            catch(err){
            console.log(err);
            }
        })
    }




function viewRoles(){
        connection.query("SELECT * FROM roles;",
        async function (err, res){
            try {
                if (err) throw err;
                console.table("roles", res);
                await initiate();
            }
            catch(err){
            console.log(err);
            }
        })
    }




function viewEmployees(){
        connection.query("SELECT * FROM employee;",
        async function (err, res){
            try {
                if (err) throw err;
                console.table("employee", res);
                await initiate();
            }
            catch(err){
            console.log(err);
            }
        })
    }  
    
    
function employeeDepartment(){
    readDept().then(department => {
        const employeeDept = department.map(({name: name, value: id}) => ({name, id}));
        inquirer
            .prompt([
                {
                    name: "employeeDepartment",
                    type: "list",
                    message: "Please select the department that you'd like to view the employees for:",
                    choices: employeeDept,
                }
                ])
                .then(answer => {
            // let query = "SELECT * FROM roles WHERE department_id = ?";


            let query = "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, roles.title FROM employee LEFT JOIN roles on roles.id = employee.role_id LEFT JOIN department ON department.id";



                    connection.query(query, [answer.employeeDepartment], 
                        async function(err, res) {
                            if (err) throw err;

                            try {
                                console.table(res);
                                await initiate();
                            }
                            catch(err) {
                                console.log(err);
                            }
                    }
                )})
                .catch(err => {
                    console.log(err);
                })
                })};




        //     connection.query("SELECT * FROM roles;",
        //     async function (err, res){
        //         try {
        //             if (err) throw err;
        //             console.table("roles", res);
        //             await initiate();
        //         }
        //         catch(err){
        //         console.log(err);
        //         }
        //     })
        // }


    




        // SELECT employee.id, employee.first_name, employee.last_name, roles.title FROM employee LEFT JOIN roles on employee.role_id = roles.id LEFT JOIN department department on roles.department_id = department.id WHERE department.id = ?;",





function endProgram() {
    clear();
    console.log(chalk.cyanBright(">>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<"));
    console.log(chalk.blueBright(">>>>                                            <<<<"));
    console.log(chalk.greenBright("****  Thank you for using Employee Tracker 1.0  ****"));
    console.log(chalk.blueBright(">>>>                                            <<<<"));
    console.log(chalk.cyanBright(">>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<"));
    console.log(chalk.blueBright(">>>>                                            <<<<"));
    console.log(chalk.greenBright("****                  Goodbye!                  ****"));
    console.log(chalk.blueBright(">>>>                                            <<<<"));
    console.log(chalk.cyanBright(">>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<"));

    process.exit();
}