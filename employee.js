const inquirer = require("inquirer");
const mysql = require("mysql");
const table = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Lif3changer!",
    port: 3306,
    database: "employeeTracker_db"
});

const mainMenu = () => {
    inquirer.prompt ([

     {
        name: "action",
        type: "list",
        message: "What action would you like to take?",
        choices: ["View Employees", "View Departments", "View Roles", "Add Employee", "Add Department", "Add Role", "Update Employee Roles", "Exit"]
     }
  ]).then(answer => {
      const action = answer.action;

      switch(action) {
        case "View Employees":
            viewEmployees();
            break;
        case "View Departments":
            viewDepartments();
            break;
        case "View Roles":
            viewRoles();
            break;
        case "Add Employee":
            addEmployee();
            break;
        case "Add Department":
            addDepartment();
            break;
        case "Add Role":
            addRole();
            break;
        case "Update Employee Roles":
            updateEmpRoles();
            break;
        case "Exit":
            connection.end();
            break;
      }
  });
}