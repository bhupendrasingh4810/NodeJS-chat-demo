'use strict'

const throwError = require('http-errors');
const User = require('mongoose').model('user');
const Workspace = require('mongoose').model('workspace');
const Channel = require('mongoose').model('channel');

// Function to create user by workspace owner

exports.createUser = async (req, res, next) => {
    try {
        let newUser = new User(req.body);
        const user = await User.find({ email: req.body.email });
        if (user.length === 1)
            return next(throwError(409, 'User already exists'));
        else {
            await newUser.save();
            Workspace.updateOne({ _id: newUser.workspace_id }, { $push: { members: newUser._id } });
            newUser = newUser.toObject();
            delete newUser.password;
            delete newUser.__v;
            res.status(200).json(res.responseHandler(newUser, 'User created successfully', 200));
        }
    } catch (err) {
        return next(throwError(err));
    }
}

// Function for user to sign up

exports.userSignUp = async (req, res, next) => {
    try {
        let user = await User.findOneAndUpdate({ email: req.body.email }, { $set: { isActive: req.body.isActive, email: req.body.email } }, { new: true });
        user = user.toObject();
        delete user.password;
        delete user.__v;
        res.status(200).json(res.responseHandler(user, 'Welcome!', 200));
    } catch (err) {
        return next(throwError(err));
    }
}

// Function to get all the users

exports.getAllUser = async (req, res, next) => {
    try {
        let user = await User.find(req.query);
        user = user.map(data => {
            return new Object({
                "workspace_id": data.workspace_id,
                "channels": data.channels,
                "isActive": data.isActive,
                "isVerified": data.isVerified,
                "online": data.online,
                "created_at": data.created_at,
                "updated_at": data.updated_at,
                "_id": data._id,
                "first_name": data.first_name,
                "last_name": data.last_name,
                "email": data.email,
            })
        });
        res.status(200).json(res.responseHandler(user, '', 200));
    } catch (err) {
        return next(throwError(err));
    }
}

// Function to get a specific user

exports.getUser = async (req, res, next) => {
    try {
        let user = await User.find({ _id: req.params.id });
        user = user.toString();
        delete user.password;
        delete user.__v;
        res.status(200).json(res.responseHandler(user, '', 200));
    } catch (err) {
        next(throwError(err));
    }
}

// Function to activate or deactivate any user

exports.activateOrDeactivateUser = async (req, res, next) => {
    try {
        await User.findOneAndUpdate({ _id: req.params.id }, { $set: { isActive: req.body.isActive } }, { new: true });
        res.status(200).json(res.responseHandler(user, 'User status changed.', 200));
    } catch (err) {
        return next(throwError(err));
    }
}

// Function to delete any user

exports.deleteUser = async (req, res, next) => {
    try {
        await Promise.all([
            User.findOneAndDelete({ _id: req.params.id }),
            Workspace.updateOne({ _id: req.body.workspace_id }, { $pull: { members: req.params.id } })
        ]);
        res.json(res.responseHandler('', 'User deleted successfully', 200));
    } catch (err) {
        return next(throwError(err));
    }
}