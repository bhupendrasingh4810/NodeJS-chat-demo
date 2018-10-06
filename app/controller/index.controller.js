'use strict'
var User = require('mongoose').model('user'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    config = require('../../config/environment/development');

exports.login = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        res.status(200).json(res.responseHandler([], { 'error': 'Email and password required' }, 'failure'));
    } else {
        var query = {
            email: req.body.email
        };
        var login = User.findOne(query).exec();

        login.then((user) => {
            if (!user) {
                res.status(200).json(res.responseHandler(err, { 'error': 'User not found' }, 'failure'));
            } else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (result) {
                        res.status(200).json(res.responseHandler(user, 'Login successfull', 'success'));
                    } else {
                        res.status(200).json(res.responseHandler([], 'Password was incorrect.', 'success'));
                    }
                })
            }
        }).catch((err) => {
            res.status(200).json(res.responseHandler(err, { 'error': 'Something went wrong' }, 'failure'));
        });
    }
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