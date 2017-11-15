const employeesDB = require("../database/employees");


const addEmployee = (requestBody) => {

    // delete _id if present in request
    delete requestBody._id;

    return new Promise(((resolve, reject) => {
        employeesDB.insertEmployee(requestBody).then((result) => {
            resolve(result);
        }, (err) => {
            reject(err);
        });
    }));
};


const updateEmployee = (item) => {

    return new Promise(((resolve, reject) => {

        employeesDB.updateEmployee(item).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });

    }));
};
const getEmployees = () => {
    return new Promise(((resolve, reject) => {
        employeesDB.getEmployees().then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    }));
};

const getEmployee = (_id) => {
    return new Promise(((resolve, reject) => {

        employeesDB.getEmployee(_id).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });

    }));
};

const deleteEmployee = (id) => {

    return new Promise(((resolve, reject) => {

        employeesDB.deleteEmployee(id).then((result) => {
            resolve();
        }).catch((err) => {
            reject(err);
        });

    }));
};



module.exports = {
    addEmployee,
    getEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee
};
