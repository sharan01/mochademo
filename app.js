const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const employees = require("./routes/employees");

const app = express();

// add validation middleware
const expressValidator = require("express-validator");
app.use(expressValidator());


// import config json
const env = process.env.NODE_ENV || "development";
const config = require("./conf/config.json")[ env ];


app.port = config.port;

console.log("app env=", app.get("env"));


// connect to database
// mongoose.set("debug", true);
mongoose.promise = Promise;
mongoose.connect(config.DBHost, { useMongoClient: true },(err) => {
    if (err) {
        throw err;
    }
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Allow cross Origin
app.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, orgUID, sessionToken, orgID, token");
    next();
});



app.use('/api/employees', employees);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = { message: "Not found", errorCode: 404 };

    err.status = 404;
    next(404);
});

// error handlers
app.use((err, req, res, next) => {

    // error handling logic
    //console.error(err);
    const error = {};

    error.errorCode = err.errorCode || 9000;
    error.message = err.message || "Internal server error";
    error.errors = err.errors || [];

    res.status(err.message || 500).send(error);

});

module.exports = app;
