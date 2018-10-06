var express = require('express'),
    cors = require('cors'),
    morgan = require('morgan'),
    mongoose = require('./mongoose'),
    bodyParser = require('body-parser'),
    compress = require('compression'),
    jwt = require('jsonwebtoken'),
    helmet = require('helmet'),
    config = require('./environment/development'),
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
    app.use(verifyToken);

    app.set('views', './app/view');
    app.set('view engine', 'ejs');

    require('../app/route/index.route')(app);

    app.use(express.static('./assets'));
    return app;
}