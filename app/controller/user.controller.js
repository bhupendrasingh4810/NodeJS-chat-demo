'use strict'

var User = require('mongoose').model('user'),
    Workspace = require('mongoose').model('workspace');

// Function to create user by workspace owner

exports.createUser = (req, res) => {
    var user = new User(req.body);
    var workspace_id = user.workspace_id
    var createUser = User.find({ email: req.body.email }).exec();

    createUser.then((err) => {
        return user.save();
    }).then((user) => {
        Workspace.updateOne({ _id: workspace_id }, { $push: { members: user._id } }).then((err) => { });
    }).then((workspace) => {
        res.status(200).json(res.responseHandler([], 'User created successfully', 'success'));
    }).catch((err) => {
        if (err.code == 11000) {
            res.status(200).json(res.responseHandler(err, { 'error': 'User already exists' }, 'success'));
        } else {
            res.status(200).json(res.responseHandler([err], '', 200));
        }
    });
}

// Function for user to sign up

exports.userSignUp = (req, res) => {
    var signUp = User.findOneAndUpdate({ _id: req.params.id }, { $set: { isActive: req.body.isActive, email: req.body.email } }, { new: true }).exec();

    signUp.then((user) => {
        res.status(200).json(res.responseHandler(user, 'Welcome!', 200));
    }).catch((err) => {
        res.status(200).json(res.responseHandler(err, '', 200));
    });
}

// Function to get all the users

exports.getAllUser = (req, res) => {
    var getUser = User.find({}).exec();

    getUser.then((user) => {
        res.status(200).json(res.responseHandler(user, '', 'success'));
    }).catch((err) => {
        res.status(200).json(res.responseHandler([], 'Can\'t get users', 'failure'));
    });
}

// Function to get a specific user

exports.getUser = (req, res) => {
    var getUser = User.find({ _id: req.params.id, isActive: true }).exec();

    getUser.then((user) => {
        res.status(200).json(res.responseHandler(user, '', 'success'));
    }).catch((err) => {
        res.status(200).json(res.responseHandler([], 'No such user found.', 'failure'));
    });
}

// Function to activate or deactivate any user

exports.activateOrDeactivateUser = (req, res) => {
    var activateOrDeactivateUser = User.findOneAndUpdate({ _id: req.params.id }, { $set: { isActive: req.body.isActive } }, { new: true }).exec();

    activateOrDeactivateUser.then((user) => {
        res.status(200).json(res.responseHandler(user, 'User status changed.', 200));
    }).catch((err) => {
        res.status(200).json(res.responseHandler(err, '', 200));
    });
}

// Function to delete any user

// exports.deleteUser = (req, res) => {
//     var findUser = User.findOneAndDelete({ _id: req.params.id }).exec();

//     findUser.then((user) => {
//         Workspace.
//     })
// }