
const EmployeeModel = require("../models/employee");

// // Require the dev-dependencies
const server = require("../bin/www");

describe("clear database",() => {

    it("it should clear the employees collection", (done) => {
        //Before test we empty the items collection
        EmployeeModel.remove({}, (err, result) => {
            done(err);
        });
    });

});
