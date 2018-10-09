'use strict'

var User = require('mongoose').model('user'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    config = require('../../config/environment/development'),
    SALT_WORK_FACTOR = 10;

exports.login = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        res.status(200).json(res.responseHandler([], { 'error': 'Email and password required' }, 'failure'));
    } else {
        var query = {
            email: req.body.email
        };
        User.findOne(query, (err, user) => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (result) {
                        res.status(200).json(res.responseHandler(user, 'Login successfull', 'success'));
                    } else {
                        res.status(200).json(res.responseHandler([], 'Password was incorrect.', 'success'));
                    }
                });
            } else {
                res.status(200).json(res.responseHandler([], 'User not found', 'failure'));
            }
        });
    }
}

exports.forgotPassword = (req, res) => {
    res.status(200).send(req.body)
}

exports.changePassword = (req, res, next) => {
    var changepassword = User.find({ _id: req.params.id }).exec();

    changepassword.then((user) => {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (result) {
                bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
                    if (err) return next(err);
                    bcrypt.hash(req.body.new_password, salt, (err, hash) => {
                        if (err) return next(err);

                        user[0].password = hash;
                        next();
                    });
                });
                User.findOneAndUpdate({ _id: user[0].id }, { $set: { password: user[0].password } }, { new: true }, (err, user) => {
                    if (user) {
                        res.status(200).json(res.responseHandler(user, 'Password changed successfully', 'success'));
                    } else {
                        res.status(200).json(res.responseHandler([], 'Password could not be changed', 'success'));
                    }
                });
            } else {
                res.status(200).json(res.responseHandler(err, 'Old password and new password does not match', 'success'));
            }
        });
    }).catch((err) => {
        res.status(404).json(res.responseHandler(err, 'User not found', 'failure'));
    });
}

exports.generateToken = (req, res) => {
    var token = jwt.sign(req.body, config.secret, { expiresIn: 604800 });
    res.json({ 'token': token });
}