var express = require('express'),
    morgan = require('morgan'),
    mongoose = require('./mongoose'),
    bodyParser = require('body-parser'),
    compress = require('compression'),
    jwt = require('jsonwebtoken'),
    config = require('./environment/development'),
    responseHandler = require('../app/middlewares/responseHandler'),
    verifyToken = require('../app/middlewares/verifyToken');

module.exports = function () {
    var app = express();
    var db = mongoose();

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan(dev));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

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