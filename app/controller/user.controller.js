var User = require('mongoose').model('user');

exports.createUser = (req, res) => {
    var user = new User(req.body);
    User.find({email: req.body.email}).then((data) => {
        if(data.length) {
            res.status(200).json(res.responseHandler([], 'User already exists', 200));
        } else {
            user.save((err) => {
                if(err) throw err;
                else res.status(200).json(res.responseHandler([], 'User created successfully.', 200))
            });
        }
    });
}