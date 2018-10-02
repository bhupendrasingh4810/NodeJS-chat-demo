var User = require('mongoose').model('user');

exports.createUser = (req, res) => {
    var user = new User(req.body);
    User.find({ email: req.body.email }).then((data) => {
        if (data.length) {
            res.status(200).json(res.responseHandler([], 'User already exists', 200));
        } else {
            user.save((err) => {
                if (err) throw err;
                else res.status(200).json(res.responseHandler([], 'User created successfully.', 200))
            });
        }
    });
}

exports.userSignUp = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, { $set: { isActive: req.body.isActive, email: req.body.email } }, { new: true }, (err, data) => {
        if (err) {
            res.status(200).json(res.responseHandler(err, '', 200));
        } else res.status(200).json(res.responseHandler(data, 'Welcome!', 200));
    });
}