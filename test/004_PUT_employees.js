const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const server = require("../bin/www");



chai.use(chaiHttp);


describe("PUT /api/employees", () => {

    let _id;
    let email = "lance@domain.com";
    let updatedEmail = "ocon@domain.com";
    let duplicateEmail = "max@domain.com";

    // first we insert an employee get id and update it
    before((done) => {


        chai.request(server)
            .post("/api/employees")
            .send({ name: "lance", email:email, designation:"HR" })
            .end((err, res) => {

                expect(res).to.have.status(201);
                expect(res.body).to.be.a("object").to.have.property("_id");
                _id = res.body._id;


                done();
            });

    });


    //
    it("it should update employee",(done) => {

        chai.request(server)
            .put("/api/employees/")
            .send({_id:_id, name:"ocon", email:updatedEmail, designation:"Intern"})
            .end((err, res) => {

                expect(res).to.have.status(200);
                expect(res.body).to.be.a("object").to.have.property("email").to.be.eq(updatedEmail);

                done();
            });
    });


    ////////// negative cases

    // wrong id
    it("it should return status 404",(done) => {

        chai.request(server)
            .put("/api/employees/")
            .send({_id:"wrongid", name:"lance", email:email, designation:"HR"})
            .end((err, res) => {

                expect(res).to.have.status(404);

                done();
            });
    });

    // updating employee email with already existing employee email
    it("it should return status 409, employee with same email already exists",(done) => {

        chai.request(server)
            .put("/api/employees")
            .send({_id:_id, name:"max", email:duplicateEmail, designation:"HR"})
            .end((err, res) => {

                expect(res).to.have.status(409);

                done();
            });
    });



});