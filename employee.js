const inquirer = require("inquirer");
const mysql = require("mysql");
const table = require("console.table");
const functions = require("./functions.js");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Lif3changer!",
    port: 3306,
    database: "employeeTracker_db",
    multipleStatements: true
});


let showroles;
let showDepts;
let showEmps;

connection.connect(function(err) {
    
    if (err) {
        console.log("error: " + err.stack);
        return;
    }
    console.log("Connected as id " + connection.threadId);
    
    connection.query("SELECT * FROM employee", function (err, res) {
        showEmps = res.map(emp => ({name: `${emp.first_name} ${emp.last_name}`, value: emp.id}))
    })

    connection.query("SELECT * FROM department",
    function(err, res) {
        showDepts = res.map(dep => ({ name: dep.name, value: dep.id }))
    })

    connection.query("SELECT * FROM rol", 
    function(err, res) {
        showroles = res.map(roles => ({ name: roles.title, value: roles.id }))
    })

    mainMenu();
});

const mainMenu = () => {
    inquirer.prompt ([

     {
        name: "action",
        type: "list",
        message: "What action would you like to take?",
        choices: ["View Employees", "View Departments", "View Roles", "Add Employee", "Add Department", "Add Role", "Update Employee Role", "Delete Employee", "Delete Department", "Delete Role", "Exit"]
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
        case "View Managers":
            viewManagers();
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
        case "Update Employee Role":
            updateEmpRole();
            break;
        case "Delete Employee":
            deleteEmployee();
            break;
        case "Delete Department":
            deleteDepartment();
            break;
        case "Delete Role":
            deleteRole();
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
        if (err) {
            console.log("Error!!!!!", err.message)
            throw err};

        console.table(res);
        console.log("\n---------------------\n");
        mainMenu();
    });
}

const viewDepartments = () => {
    console.log("\nViewing all Departments\n");
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;

        console.table(res);
        console.log("\n---------------------\n");
        mainMenu();
    });
}

const viewRoles = () => {
    console.log("\nViewing all Roles\n");
    connection.query("SELECT * FROM rol", function(err, res) {
        if (err) throw err;

        console.table(res);
        console.log("\n---------------------\n");
        mainMenu();
    });
}

const viewManagers = () => {
    console.log("\nViewing all Managers\n");
    connection.query("SELECT * FROM managers", function(err, res) {
        if (err) {
            console.log("Error!!!!!", err.message)
            throw err};

        console.table(res);
        console.log("\n---------------------\n");
        mainMenu();
    });
}

const addRole = () => {
    inquirer.prompt([
        {
            name: "rol",
            type: "input",
            message: "What is the name of the role you'd like to add?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary of the new role?"
        },
        {
            name: "department_id",
            type: "input",
            message: "What is the department id for the new role?"
        }
    ]).then(function(answer) {
        connection.query(
            "INSERT INTO rol SET ?",
            {
                title: answer.rol,
                salary: answer.salary,
                department_id: answer.department_id
            },
            function(err) {
                if (err) throw err;
                console.table(answer);
                console.log("Your new role was successfully added!");

                mainMenu();
            }
        );
    });
}

const addDepartment = () => {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What is the name of the department you'd like to add?"
        }
    ]).then(function(answer) {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.name
            },
            function(err) {
                if (err) throw err;
                console.table(answer);
                console.log("Your new department was successfully added!");

                mainMenu();
            }
        );
    });
}

const addEmployee = () => {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the first name of the new employee?"
        },
        {
            name: "last_name",
            type: "input",
            message: "Whatis the last name of the new employee?"
        },
        {
            name: "rol_id",
            type: "input",
            message: "What is the role id of the new employee?"
        },
        {
           name: "manager_id",
           type: "input",
           message: "What is the manager's id for the new employee?" 
        }
    ]).then(function(answer) {
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                rol_id: answer.rol_id,
                manager_id: answer.manager_id
            },
            function(err) {
                if (err) throw err;
                console.table(answer);
                console.log("Your new employee was added successfully!");
                mainMenu();
            }
        );
    });
}

const deleteEmployee = () => {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
// console.table(res);
        inquirer.prompt ([
            {
                name: "empId",
                type: "list",
                message: "Select the employee you'd like to delete.",
                choices: showEmps
        }
        ]).then(function(res) {
            removeById(res);
            });
    });

}

const removeById = (data) => {
    connection.query(
        `DELETE FROM employee WHERE id = ${data.empId}`,
        [{name: data.empId}],
        function(err, res) {
            //console.log(res);
            if(err) {
                console.log(err, err.message);
            }
           mainMenu();    
            
        },
        );
    }


    // const updateEmployees = (data) => {
    //     connection.query(`UPDATE employee SET rol_id = ${data.rolId} WHERE id = ${data.empId}`, 
    //     function(err, res) {
    //         if (err)
    //         throw err;
    //     });
    //     mainMenu();
    // }



const deleteDepartment = () => {
    connection.query("SELECT name FROM department", function(err, res) {
        if(err) throw err;
        inquirer.prompt([
            {
                name: "name",
                type: "list",
                message: "Which department would you like to delete?",
                choices: showDepts
            }          
        ]).then(function(answer) {
            //console.log("working here?");
            removeByDeptId(answer);
    });
}

    )}


const removeByDeptId = (data) => {

    
}

const deleteRole = () => {
    connection.query("SELECT title FROM rol", function(err, res) {
        if (err) throw err;

        inquirer.prompt ([
            {
                name: "rolId",
                type: "list",
                message: "Select the role you'd like to delete.",
                choices: showroles
        }
        ]).then(function(answer) {
          removeByRoleId(answer);
        
    });
});

}

const removeByRoleId = (data) => {
    connection.query("DELETE FROM rol WHERE ?",
    [{
        id: data.rolId
    }],
    function(err, res) {
        if (err) throw err;
        //console.table(res);
        console.log("The role was deleted.");
        mainMenu();
    });
}


const updateEmpRole = () => {
    connection.query("SELECT * FROM employee",
    function(err, res) {
        if (err) throw err;
        console.table(res);
        inquirer.prompt([
           {
               name: "empId",
               type: "list",
               message: "Select the employee whose role you want to update.",
               choices: showEmps
           },
           {
               name: "rolId",
               type: "list",
               message: "What is the new role id for the employee?",
               choices: showroles
           }

        ]).then(function(res) {
            console.log(res);
            updateRole(res);
           
        });

    });
}

const updateRole = (data) => {
    connection.query(`UPDATE employee SET rol_id = ${data.rolId} WHERE id = ${data.empId}`, 
    function(err, res) {
        if (err)
        throw err;
    });
    mainMenu();
}