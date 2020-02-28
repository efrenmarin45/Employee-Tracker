--Drops DB if it exists to start fresh 
DROP DATABASE IF EXISTS employee_trackerDB;

-- Creates a new DB
CREATE DATABASE employee_trackerDB;

-- Uses new DB
USE employee_trackerDB;

-- Creates department table
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

-- Creates roles table
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT,
    PRIMARY KEY (id),
    INDEX department_index,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE
);

-- Creates employee table
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_name VARCHAR(30) DEFAULT 'NONE',
    PRIMARY KEY (id),
    INDEX role_index,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE
);
