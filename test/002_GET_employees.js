// 02_GET_employees.js

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const server = require("../bin/www");

chai.use(chaiHttp);

// test suite
describe("GET /api/employees", function() {

    it("it should return employees array with size 1", function(done) {

        chai.request(server)
            .get("/api/employees")
            .end((err, res) => {

                expect(res).to.have.status(200);
                expect(res.body).to.be.a("array").of.length(1);
                // expect first employee to have these properties
                expect(res.body[0]).to.have.property("_id");
                expect(res.body[0]).to.have.property("name");
                expect(res.body[0]).to.have.property("email");
                expect(res.body[0]).to.have.property("designation");

                done();
            });
    });

});