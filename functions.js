

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

const addRole = () => {
    inquirer.prompt([
        {
            name: "role",
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
                title: answer.role,
                salary: answer.salary,
                department_id: answer.department_id
            },
            function(err) {
                if (err) throw err;
                console.log(answer);
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
                console.log(answer);
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
            name: "role_id",
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
                role_id: answer.role_id,
                manager_id: answer.manager_id
            },
            function(err) {
                if (err) throw err;
                console.log(answer);
                console.log("Your new employee was added successfully!");
                mainMenu();
            }
        );
    });
}

const deleteEmployee = () => {
    inquirer.prompt ([
        {
            name: "removeId",
            type: "input",
            message: "What is the id of the employee you'd like to remove?"
        }
    ]).then(function(answer) {
        connection.query(
            "DELETE FROM employee WHERE id = ?",
            [{
                id : answer.removeId
            }],
            function(err, res) {
                if (err) throw err;
                console.log(res);
                console.log(`The employee with the id was deleted.`);
                mainMenu();
            }
        );
    });
}