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
                message: "What would you like to change?",
                choices: ["Delete a department", "Delete a job role", "Delete an employee", "Update an employee's role", "Return to menu"]
            }
        ])
        .then(answer => {
            if (answer.userUpdate === "Delete a department"){
                deleteDepartment();
            }
            else if (answer.userUpdate === "Delete an employee"){
                deleteEmployee();
            }
            else if (answer.userUpdate === "Delete a job role"){
                deleteRole();
            }
            else if (answer.userUpdate === "Update an employee's role"){
                updateEmployeeRole();
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
                message: "Please enter the name of this employee's manager. If none, type N/A :",
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

function viewManager(){
    connection.query("SELECT manager_name AS Manager, CONCAT(first_name, ' ', last_name) AS Employee FROM employee;",
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
        const employeeDept = department.map(({name: name, id: value}) => ({name, value}));
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

                    let query = "SELECT * FROM employee WHERE role_id = ?";
                    connection.query(query, [answer.employeeDepartment], 
                        async function(err, res) {
                            if (err) throw err;

                            try {
                                console.table("Roles",res);
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

function employeeRole(){
    readRoles().then(roles => {
        const employeeRole = roles.map(( {title: name, id: value}) => ({name, value}));
        inquirer
            .prompt({
                name: "userEmployeeRole",
                type: "list",
                message: "Select the role that you'd like to see the employee's for:",
                choices: employeeRole
            })
            .then(answer => {
                let query = "Select * FROM employee WHERE role_id = ?";
                connection.query(query, [answer.userEmployeeRole],
                    async function(err, res){
                        if(err) throw err;

                        try {
                            console.table("Employee", res);
                            await initiate();
                        }
                        catch (err){
                            console.log(err);
                        }
                    })
            })
            .catch(err => {
                console.log(err);
            })
    })
}

function deleteDepartment(){
    readDept().then(department => {
        const delDept = department.map(({name: name, id: value}) => ({name, value}));
            inquirer
                .prompt([
                    {
                        name: "deleteDept",
                        type: "list",
                        message: "Please choose the department you'd like to delete:",
                        choices: delDept
                    }
                ])
                .then(answer => {
                    connection.query("DELETE FROM department WHERE id = ?", [answer.deleteDept],
                        async function(err, res){
                            if(err) throw err;
                            try{
                                console.log("Department successfully deleted!", res)
                                await initiate();
                            }
                            catch(err){
                                console.log(err);
                            }
                        });
                });
            
    });
};

function deleteEmployee(){
    readEmployee().then(employee => {
        const delEmployee = employee.map(({name: name, id: value}) => ({name, value}));
            inquirer
                .prompt([
                    {
                        name: "deleteEmp",
                        type: "list",
                        message: "Please select the employee that you would like to remove:",
                        choices: delEmployee
                    }
                ])
                .then(answer => {
                    connection.query("DELETE FROM employee WHERE id = ?", [answer.deleteEmp], 
                        async function(err, res){
                            if(err) throw err;
                            try {
                                console.log("Employee successfully removed!", res);
                                await initiate();
                            }
                            catch(err){
                                console.log(err);
                            }
                        });
                });
        });
    };


function deleteRole(){
    // TODO Need to finish
}

function updateEmployeeRole(){
    // TODO Need to finish
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

function readEmployee(){
    return new promise((resolve, reject) => {
        connection.query("SELECT * FROM employee", 
            function(err, res){
                if(err) reject(err);
                resolve(res);
            });
    });
};





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