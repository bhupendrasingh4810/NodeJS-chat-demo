var mongoose = require('mongoose'),
    promise = require('promise'),
    User = require('mongoose').model('user');

exports.login = (req, res) => {
    if (req.method == 'GET') {
        res.render('login', {
            title: 'Home'
        })
    } else if (req.method == 'POST') {
        res.status(200).send(req.body)
    }
}

exports.signup = (req, res) => {
    if (req.method == 'GET') {
        res.render('signup', {
            title: 'Home'
        })
    } else if (req.method == 'POST') {
        var user = new User(req.body)
        User.find({ email: req.body.email }).then((data) => {
            if (data.length) {
                res.status(200).json(res.responseHandler(data, 'User already exists!', 200) )
            } else {
                user.save((err) => {
                    if (err) {
                        return res.status(400).json({ 'status': 'failure', 'error': 'User couldn\'t be added!' });
                    } else {
                        res.status(200).json({ 'status': 'success', 'message': 'User successfully added!', 'data': user });
                    }
                });
            }
        });
    } else {
        res.status(404).json({ 'status': 'failure', 'error': 'Url can\'t be found!' })
    }
}

exports.forgotPassword = (req, res) => {
    if (req.method == 'GET') {
        res.render('forgotpassword', {
            title: 'Home'
        })
    } else if (req.method == 'POST') {
        res.status(200).send(req.body)
    }
}