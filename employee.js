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

connection.connect(function(err) {
    if (err) throw err;
    mainMenu();
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

const viewEmployees = () => {
    console.log("\nViewing all Employees\n");
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;

        console.log(res);
        console.log("\n---------------------\n");
        mainMenu();
    });
}

const viewDepartments = () => {
    console.log("\nViewing all Departments\n");
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;

        console.log(res);
        console.log("\n---------------------\n");
        mainMenu();
    });
}

const viewRoles = () => {
    console.log("\nViewing all Roles\n");
    connection.query("SELECT * FROM rol", function(err, res) {
        if (err) throw err;

        console.log(res);
        console.log("\n---------------------\n");
        mainMenu();
    });
}