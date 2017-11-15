
const EmployeeModel = require("../models/employee");

// // Require the dev-dependencies
const server = require("../bin/www");

describe("clear database",() => {

    it("it should clear the employees collection", () => {
        //after test clear test data
        EmployeeModel.remove({}, (err, result) => {
            done(err);
        });
    });

});
