'use strict'
var jwt = require('jsonwebtoken'),
    config = require('../../config/environment/development');

module.exports = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token == config.token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.status(200).json(res.responseHandler([], 'Failed to authenticate token.', 'failure'));
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        return res.status(403).send({
            status: 'failure',
            message: 'No token provided.'
        });
    }
}