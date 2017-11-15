const validations = require("../validations/employees");

const employeeService = require("../services/employees");

const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {

    employeeService.getEmployees().then((items)=>{
        res.send(items);
    }).catch((err)=>{
        next(err);
    });

});

router.get("/:id", (req, res, next) => {

    employeeService.getEmployee(req.params.id).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        next(err);
    });
});

router.post("/",(req, res, next) => {

    validations.addEmployee(req).then(()=>{
        return employeeService.addEmployee(req.body);
    }).then((item) => {
        res.status(201).send(item);
    }).catch((err) => {
        next(err);
    });
});

router.put("/", (req, res, next) => {

    validations.updateEmployee(req).then(()=>{
        return employeeService.updateEmployee(req.body);
    }).then((employee)=>{
        res.send(employee);
    }).catch((err)=>{
        next(err);
    });
});
router.delete("/:id", (req, res, next) => {

    employeeService.deleteEmployee(req.params.id).then(()=>{
        res.status(204).send();
    }).catch((err)=>{
        next(err);
    });
});

module.exports = router;

