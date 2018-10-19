'use strict'

var Workspace = require('mongoose').model('workspace'),
    Channel = require('mongoose').model('channel'),
    Constant = require('../constant/constant');

// Function to create workspace

exports.createWorkspace = (req, res) => {
    var workspace = new Workspace(req.body)
    var createWorkspace = Workspace.findOne({ email: req.body.email }).exec();

    createWorkspace.then(() => {
        return workspace.save();
    }).then((user) => {
        user = user.toObject();
        delete user.password;
        res.status(200).json(res.responseHandler(user, Constant.constant.create_workspace, 'success'));
    }).catch((err) => {
        if (err.code == 11000) {
            res.status(200).json(res.responseHandler([], { 'error': Constant.constant.workspace_exists }, 'success'));
        } else {
            res.status(200).json(res.responseHandler([], { 'error': 'Something is missing' }, 'failure'));
        }
    });
};

// Function to get all the workspaces which are active

exports.getAllWorkspace = (req, res) => {
    var getAllWorkspace = Workspace.find({ isActive: true }, ['workspace_name', 'owner_name', 'email', 'mobile_no', 'members', 'channels', 'status', 'isActive', 'isVerified', 'created_at', 'updated_at']).exec();

    getAllWorkspace.then((data) => {
        if (data.length) {
            res.status(200).json(res.responseHandler(data, '', 'success'));
        } else {
            res.status(200).json(res.responseHandler([], { 'error': Constant.constant.workspace_not_exists }, 'success'));
        }
    }).catch((err) => {
        res.status(200).json(res.responseHandler(err, { 'error': Constant.constant.workspace_not_exists }, 'failure'));
    });
};

// Function to get workspace with ID and active

exports.getWorkspace = (req, res) => {
    var getWorkspace = Workspace.findOne({ _id: req.params.id, isActive: true }).exec();

    getWorkspace.then((data) => {
        data = data.toObject();
        delete data.password;
        res.status(200).json(res.responseHandler(data, '', 200));
    }).catch((err) => {
        res.status(200).json(res.responseHandler('No such workspace exists!'));
    });
};


// Function to activate or deactivate any workspace

exports.activateOrDeactivateWorkspace = (req, res) => {
    var promise = Workspace.findOneAndUpdate({ _id: req.params.id }, { $set: { isActive: req.body.isActive } }, { new: true }).exec();

    promise.then((data) => {
        data = data.toObject();
        delete data.password;
        res.status(200).json(res.responseHandler(data, 'Workspace updated successfully.', 'success'));
    }).catch((err) => {
        if (err && err.n == 0) {
            res.status(200).json(res.responseHandler(err, 'Can not perform this action.', 'failure'));
        }
    });
};

// Function to delete workspace

exports.deleteWorkspace = (req, res) => {
    let channels;
    var findWorkspace = Workspace.find({ _id: req.params.id }).exec();

    findWorkspace.then((data) => {
        channels = data[0].channels
        var deleteWorkspace = Workspace.deleteOne({ _id: req.params.id }).exec();

        deleteWorkspace.then((data) => {
            Channel.remove({ _id: { $in: channels } }).then((err) => { });
            res.status(200).json(res.responseHandler([], 'Workspace deleted successfully.', 'success'));
        }).catch((err) => {
            res.status(200).json(res.responseHandler(err, 'Workspace could not be deleted.', 'success'));
        });
    }).catch((err) => {
        res.status(200).json(res.responseHandler(err, 'Workspace does not exists.'));
    });
};

// Function to update workspace

exports.updateWorkspace = (req, res) => {
    var findWorkspace = Workspace.find({ _id: req.params.id }).exec();

    findWorkspace.then((data) => {
        req.body.updated_at = new Date();
        var updateWorkspace = Workspace.updateMany({ _id: req.params.id }, req.body, { new: true }).exec();

        updateWorkspace.then((data) => {
            res.status(200).json(res.responseHandler(data, 'Workspace updated successfully', 'success'));
        })
    }).catch((err) => {
        res.status(200).json(res.responseHandler(err, 'Workspace could not be updated', 'failure'));
    })
};