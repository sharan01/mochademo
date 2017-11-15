//01_POST_employees.js

// import test dependencies

// chai assertions library
const chai = require("chai");
// chai-http http plugin for accessing rest apis
const chaiHttp = require("chai-http");
// expect is a bdd style assertions from chai
const expect = chai.expect;
// our application server
const server = require("../bin/www");
// use chai-http plugin
chai.use(chaiHttp);

// test suite
describe("POST /api/employees", function() {

    // our sample employee object to add
    const sampleEmployee = {
        name:"max verstappen",
        designation:"Driver",
        email:"max@domain.com"
    };

    // test case
    it("it should add employee and return _id with response status 201",function(done) {

        chai.request(server) // use our application server
            .post("/api/employees") // api path
            .send(sampleEmployee) // request body
            .end((err, response) => { // on response callback
                // expect response to have status 201
                expect(response).to.have.status(201);
                // expect response body to be a json object
                // and to have property named _id
                expect(response.body).to.be.a("object").to.have.property("_id");

                done(); // done callback
            });
    });


    it("it should return 409 conflict, employee already exists",function(done) {

        chai.request(server)
            .post("/api/employees")
            .send(sampleEmployee)
            .end((err, res) => {
                expect(res).to.have.status(409);
                done();
            });
    });

    //invalid input test case
    it("it should return status 422 , invalid params, params missing",function(done) {

        chai.request(server)
            .post("/api/employees")
            .send({ name: "max" })
            .end((err, res) => {
                expect(res).to.have.status(422);
                done();
            });
    });
    //invalid input test case
    it("it should return status 422 , invalid params, empty name", function(done) {

        chai.request(server)
            .post("/api/employees")
            .send({ name: "" })
            .end((err, res) => {
                expect(res).to.have.status(422);
                done();
            });
    });

});