USE employee_trackerDB;

-- Department Names
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");
INSERT INTO department (name)
VALUES ("Marketing");
INSERT INTO department (name)
VALUES ("Support");
INSERT INTO department (name)
VALUES ("Clerical");

-- Engineering Roles
INSERT INTO roles (title, salary, department_id)
VALUES ("Engineering Intern", 35000, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Jr. Software Engineer", 65000, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Sr. Software Engineer", 135000, 1);

-- Sales Roles
INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Associate", 28000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 29500, 2);

-- Finance Roles
INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", 45000, 3);
INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Accountant", 55000, 3);

-- Legal Roles
INSERT INTO roles (title, salary, department_id)
VALUES ("Lawyer", 85000, 4);
INSERT INTO roles (title, salary, department_id)
VALUES ("Legal Team Lead", 145000, 4);

-- Marketing Roles
INSERT INTO roles (title, salary, department_id)
VALUES ("Marketing Associate", 37000, 5);
INSERT INTO roles (title, salary, department_id)
VALUES ("Marketing Team Lead", 40000, 5);

-- Support Roles
INSERT INTO roles (title, salary, department_id)
VALUES ("Support Rep", 32000, 6);
INSERT INTO roles (title, salary, department_id)
VALUES ("Support Team Lead", 36000, 6);

-- Clerical Roles
INSERT INTO roles (title, salary, department_id)
VALUES ("Secretary", 32000, 7);
INSERT INTO roles (title, salary, department_id)
VALUES ("Office Manager", 32000, 7);

-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Jayden", "Marin", 1, "Bobby Flay");
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Bobby", "Flay", 3, "N/A");
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Alshon", "Jeffery", 5, "N/A");
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Carson", "Wentz", 6, "Guy Fieri");
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Guy", "Fieri", 7, "N/A");
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Nelson", "Agholor", 9, "N/A");
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Desaun", "Jackson", 10, "Rachel Ray");
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Rachel", "Ray", 11, "N/A");
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Zach", "Ertz", 13, "N/A");
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Donovan", "Mcnabb", 15, "N/A");