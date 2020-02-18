const connection = require("./connection");

class masterDB {
    constructor(connection) {
        this.connection = connection;
    }
    
    readEmployees(){
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT (manager.first_name) AS manager FROM employee LEFT JOIN roles on employee.role_id = roles.id LEFT JOIN department on roles.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        )
    }

    readRoles(){
        return this.connection.query(
            "SELECT roles.id, roles.title, department.name AS department, roles.salary FROM roles LEFT JOIN department on roles.department_id = department.id;"
        )
    }
    addedEmployee(employee) {
        return this.connection.query("INSERT INTO employee SET ?", employee);
      }
}

module.exports = new masterDB(connection);