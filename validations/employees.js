const addEmployee = (request) => {

    return new Promise((resolve, reject) => {

        request.checkBody({
            name: { notEmpty: true },
            email:{isEmail:true},
            designation:{notEmpty:true}
        });


        const validationErrors = request.validationErrors();


        if (validationErrors) {
            reject(new Error(422));
            return;
        }

        resolve();


    });

};

const updateEmployee = (request) => {

    return new Promise((resolve, reject) => {

        request.checkBody({
            name: { notEmpty: true },
            _id : {notEmpty: true},
            email:{isEmail:true},
            designation:{notEmpty:true}
        });


        const validationErrors = request.validationErrors();


        if (validationErrors) {
            reject(new Error(422));
            return;
        }

        resolve();


    });

};
const deleteEmployee = (request) => {

    return new Promise((resolve, reject) => {

        request.checkBody({
            _id: { notEmpty: true }
        });


        const validationErrors = request.validationErrors();


        if (validationErrors) {
            reject(new Error(422));
            return;
        }

        resolve();


    });

};


module.exports = {
    addEmployee,
    updateEmployee,
    deleteEmployee
};
