const consoleTable = require("console.table");
const inquirer = require("inquirer");
const cliArt = require("figlet");
const clear = require("clear");
const chalk = require("chalk");
// const dbconnect = require("./DB-Files/connection");
const db = require("./DB-Files/dataQueries");




// const connection = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "Wander89!",
//     database: "employee_trackerDB"
// });
// connection.connect(function(err) {
//     if (err) throw err;

//     clear();

//     console.log(chalk.green(cliArt.textSync('Employee Tracker', {horizontalLayout: 'fitted'})));

//     initiate();
// });

// connection.query = util.promisify(connection.query);


start();

function start(){
    clear();

    console.log(chalk.green(cliArt.textSync('Employee Tracker', {horizontalLayout: 'fitted'})));
    initiate();
}

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

async function addEmployee(){
    const roles = await db.readRoles();
    const employee = await db.readEmployees();

    // readRoles().then(roles => {
        // const userRoleChoice = roles.map(( {id, title} ) => ({
        //     name: title,
        //     value: id
        // }));
        // inquirer
            const newEmployee = await prompt([
                {
                    name: "firstName",
                    type: "input",
                    message: "Please enter the employee's first name:"
                },
                {
                    name: "lastName",
                    type: "input",
                    message: "Please enter the employee's last name:"
                }
            ]);
            const userRoleChoice = roles.map(( {id, title} ) => ({
                name: title,
                value: id
            }));

            const {employeeRole} = await prompt(
                {
                    name: "employeeRole",
                    type: "list",
                    message: "Please select the employee's job role:",
                    choices: userRoleChoice
                });

                newEmployee.role_id = employeeRole;
                
                const userManagerChoice = employee.map(( {id, first_name, last_name}) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                }));

                userManagerChoice.push({ name: "None", value: null });

                const {employeesManager} = await prompt (
                    {
                    name: "employeesManager",
                    type: "list",
                    message: "Please choose this employee's manager:"
                    });

                userManagerChoice.manager_id = employeesManager;

                await db.addedEmployee(newEmployee);

                console.log("Employee added succesfully!")
                
                start();

            
            // .then(answer => {
            //     connection.query(
            //         "INSERT INTO employee SET ?",
            //         {
            //             first_name: answer.firstName,
            //             last_name: answer.lastName,
            //             role_id: answer.employeeRole,
            //             manager_id: answer.employeesManager
            //         },
            //         (err => {
            //             if (err) throw err;
            //             console.log("Employee added succesfully!")
            //             start();
            //         })
            //     )
            // })
    
}

// function readRoles(){
//     return new Promise((resolve, reject) => {
//         connection.query("SELECT * FROM roles;",
//         function (err, res){
//             if(err) reject (err);
//             resolve(res);
//         })
//     })
// }


