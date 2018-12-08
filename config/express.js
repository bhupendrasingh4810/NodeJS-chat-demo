const express = require('express');
const cors = require('cors');
const mongoose = require('./mongoose');
const bodyParser = require('body-parser');
const compress = require('compression');
const helmet = require('helmet');
const session = require('express-session');
const throwError = require('http-errors');

const responseHandler = require('../app/middlewares/responseHandler');
const verifyToken = require('../app/middlewares/verifyToken');

module.exports = function () {
    const app = express();
    const db = mongoose();

    app.use(helmet());
    app.use(cors({
        origin: ["http://localhost:4200/"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "x-access-token"]
    }));
    app.use(compress());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(responseHandler);
    // app.use(throwError);
    // app.use(verifyToken);
    app.use(session({
        secret: 'bhupendrasingh',
        resave: true,
        saveUninitialized: false
    }))

    app.set('views', './app/view');
    app.set('view engine', 'ejs');

    require('../app/route/index.route')(app);

    app.use(express.static('./assets'));
    return app;
}