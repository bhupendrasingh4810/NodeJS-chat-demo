var User = require('mongoose').model('user');

exports.login = (req, res) => {
    res.status(200).send(req.body)
}

exports.signup = (req, res) => {
    var user = new User(req.body)
    User.find({ email: req.body.email }).then((data) => {
        if (data.length) {
            res.status(200).json(res.responseHandler(data, 'User already exists!', 200))
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
}

exports.forgotPassword = (req, res) => {
    res.status(200).send(req.body)
}