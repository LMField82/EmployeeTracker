DROP DATABASE IF EXISTS employeeTracker_db;

CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30),
PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("test");

CREATE TABLE rol (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30), 
salary DECIMAL(10, 2),
department_id INT(10),
PRIMARY KEY (id)
);

INSERT INTO rol (title, salary, department_id)
VALUES ("test", 35000.00, 123);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT(10),employee
manager_id INT(10),
PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("test", "test", 12, 123);


SELECT * FROM department;
SELECT * FROM rol;
SELECT * FROM employee;

