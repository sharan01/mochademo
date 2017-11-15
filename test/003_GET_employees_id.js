const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const server = require("../bin/www");

chai.use(chaiHttp);


describe("GET /api/employees/:id", function(done) {

    let _id;

    const sampleEmployee = {
      name: "Christian Horner",
      designation: "Team Principal",
      email: "christian@domain.com"
    };

    // before hook which run before our test cases in this test suite
    // first we add an employee and get id of that employee
    before(function(done) {

        chai.request(server)
            .post("/api/employees")
            .send(sampleEmployee)
            .end((err, res) => {

                expect(res).to.have.status(201);
                expect(res.body).to.be.a("object").to.have.property("_id");
                // store id for use in below test case
                _id = res.body._id;

                done();
            });

    });


    //
    it("it should return employee inserted in before hook", function(done) {

        chai.request(server)
            .get("/api/employees/"+_id)
            .end((err, res) => {

                expect(res).to.have.status(200);
                // assert returned employee is equal to sample employee
                expect(res.body).to.be.a("object").to.have.property("name").to.be.eq(sampleEmployee.name);
                expect(res.body.designation).to.be.eq(sampleEmployee.designation);
                expect(res.body.email).to.be.eq(sampleEmployee.email);

                done();
            });
    });


    it("it should return status 404 when given invalid id", function(done){

        chai.request(server)
            .get("/api/employees/wrongid")
            .end((err, res) => {

                expect(res).to.have.status(404);

                done();
            });
    });



});