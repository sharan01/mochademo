const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const server = require("../bin/www");



chai.use(chaiHttp);


describe("DELETE /api/employees", () => {

    let _id;
    let email = "sergio@domain.com";

    // first we insert an employee get id to use for delete api
    before((done) => {

        chai.request(server)
            .post("/api/employees")
            .send({ name: "sergio", email:email, designation:"Trainee" })
            .end((err, res) => {

                expect(res).to.have.status(201);
                expect(res.body).to.be.a("object").to.have.property("_id");
                _id = res.body._id;


                done();
            });

    });


    // postive test case
    it("it should delete employee",(done) => {

        chai.request(server)
            .delete("/api/employees/"+_id)
            .end((err, res) => {

                expect(res).to.have.status(204);

                done();
            });
    });

    //after hook to verify whether employee has been deleted by calling GET /employees/:id api

    after((done) => {
        chai.request(server)
            .get("/api/employees/"+_id)
            .end((err, res) => {

                expect(res).to.have.status(404);

                done();
            });
    });

    // negative cases

    it("it should return status 404",(done) => {

        chai.request(server)
            .delete("/api/employees/worngid")
            .end((err, res) => {

                expect(res).to.have.status(404);

                done();
            });
    });



});