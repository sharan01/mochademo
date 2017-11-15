
const EmployeeModel = require("../models/employee");



const getEmployees = () => {
    return new Promise((resolve, reject) => {

        EmployeeModel.find({}, (err, items) => {
            if (err){
                reject(new Error());
            } else {
                resolve(items);
            }
        });

    });
};
const insertEmployee = (item) => new Promise((resolve, reject) => {

    const newItem = new EmployeeModel(item);

    newItem.save((err, result) => {
        if (err) {
            if (err.code === 11000) {
                reject(new Error(409));
            } else {
                reject(new Error(422));
            }
        } else {
            resolve(result);
        }

    });

});
const getEmployee = (id) => new Promise((resolve, reject) => {

    EmployeeModel.findOne({ _id: id }, (err, item) => {
        if (err || !item) {
            return reject(new Error(404));
        }

        return resolve(item);

    });
});

const updateEmployee = (item) => new Promise((resolve, reject) => {

    EmployeeModel.update({ _id: item._id }, item, (err, raw) => {
        if (err) {
            if (err.code === 11000){
                reject(new Error(409));
            } else {
                reject(new Error(404));
            }

        } else {
            // { ok: 0, n: 0, nModified: 0 }
            if (raw.nModified === 0 && raw.ok !== 1 ) {
                reject(new Error(404));
            } else {
                resolve(item);
            }

        }
    });

});

const deleteEmployee = (_id) => {

    return new Promise(((resolve, reject) => {
        EmployeeModel.findOneAndRemove( { _id: _id }, (err, result) => {
            if(err){
                reject(new Error(404));
            }else if (result){
                resolve();
            }else {
                reject(new Error(404));
            }
        });
    }));

};

const clear = () => {
    EmployeeModel.remove({}, (err) => {
        console.error(err);
    });
};


module.exports = {
    getEmployees,
    getEmployee,
    insertEmployee,
    updateEmployee,
    deleteEmployee,
    clear
};
