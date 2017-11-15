const mongoose = require("mongoose");


const collections = require("../conf/db_collections.json");


const EmployeeSchema = new mongoose.Schema({

        name: {
            type: String,
            required: true,
            trim: true
        },
        email:{
            type:String,
            required: true,
            unique:true,
            trim:true,
            lowercase: true,
        },
        designation: {
            type:String,
            required: true,
            unique:true,
            trim:true
        }
    }

, { collection: collections.employeeCollection, versionKey: false });


module.exports = exports = mongoose.model(collections.employeeCollection, EmployeeSchema);