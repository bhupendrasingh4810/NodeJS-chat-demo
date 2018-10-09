var express = require('express'),
    cors = require('cors'),
    mongoose = require('./mongoose'),
    bodyParser = require('body-parser'),
    compress = require('compression'),
    helmet = require('helmet'),
    session = require('express-session'),
    responseHandler = require('../app/middlewares/responseHandler'),
    verifyToken = require('../app/middlewares/verifyToken');

module.exports = function () {
    var app = express();
    var db = mongoose();

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