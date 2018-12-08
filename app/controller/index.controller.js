'use strict'

const User = require('mongoose').model('user');
const Session = require('mongoose').model('session');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const throwError = require('http-errors');
const config = require('../../config/environment/development');
const SALT_WORK_FACTOR = 10;

exports.login = async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        res.status(200).json(res.responseHandler([], { 'error': 'Email and password required' }, 400));
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (result) {
                    let sessionData = {
                        'ip': req.connection.remoteAddress,
                        'user_id': user._id,
                        'token': req.headers['x-access-token']
                    }
                    let session = new Session(sessionData);
                    session.save();
                    user = user.toObject();
                    delete user.password;
                    delete user.__v;
                    res.status(200).json(res.responseHandler({ "user": user, "session": session }, 'Login successfull', 200));
                } else next(throwError(err));
            });
        }
    } catch (err) {
        return next(throwError(err));
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

exports.logout = (req, res) => {
    if (req.headers['x-access-token'] && req.headers.session_id) {
        var deleteSession = Session.findOneAndDelete({ session_id: req.headers.session_id }).exec();

        deleteSession.then(() => {
            res.status(200).json(res.responseHandler([], 'Logout successfull', 'success'));
        }).catch((err) => {
            res.status(200).json(res.responseHandler(err, 'Can not logout', 'failure'));
        })
    }
}