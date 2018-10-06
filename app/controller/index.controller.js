'use strict'
var User = require('mongoose').model('user'),
    jwt = require('jsonwebtoken'),
    config = require('../../config/environment/development');

exports.login = (req, res) => {
    res.status(200).json(res.responseHandler(req.body, 'Login successfull', 'success'));
}

exports.forgotPassword = (req, res) => {
    res.status(200).send(req.body)
}

exports.changePassword = (req, res) => {

}

exports.generateToken = (req, res) => {
    var token = jwt.sign(req.body, config.secret, { expiresIn: 604800 });
    res.json({ 'token': token });
}