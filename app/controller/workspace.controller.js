'use strict'
var Workspace = require('mongoose').model('workspace'),
    Channel = require('mongoose').model('channel'),
    Constant = require('../constant/constant');

// Function to create workspace

exports.createWorkspace = (req, res) => {
    var workspace = new Workspace(req.body)
    var promise = Workspace.findOne({ email: req.body.email }).exec();

    promise.then((err) => {
        return workspace.save();
    }).then((user) => {
        res.status(200).json(res.responseHandler(user, Constant.constant.create_workspace, 'success'));
    }).catch((err) => {
        if (err.code == 11000) {
            res.status(200).json(res.responseHandler([], { 'error': Constant.constant.workspace_exists }, 'failure'));
        } else {
            res.status(200).json(res.responseHandler([], { 'error': Constant.constant.workspace_exists }, 'failure'));
        }
    });
}

// Function to get all the workspaces which are active

exports.getAllWorkspace = (req, res) => {
    var promise = Workspace.find({ isActive: true }, ['workspace_name', 'owner_name', 'email', 'mobile_no', 'members', 'channels', 'status', 'isActive', 'isVerified', 'created_at', 'updated_at']).exec();

    promise.then((data) => {
        if (data.length) {
            res.status(200).json(res.responseHandler(data, '', 'success'));
        } else {
            res.status(200).json(res.responseHandler([], { 'error': Constant.constant.workspace_not_exists }, 'success'));
        }
    }).catch((err) => {
        res.status(200).json(res.responseHandler(err, { 'error': Constant.constant.workspace_not_exists }, 'failure'));
    });
}

// Function to get workspace with ID and active

exports.getWorkspace = (req, res) => {
    var promise = Workspace.findOne({ _id: req.params.id, isActive: true }).exec();

    promise.then((data) => {
        res.status(200).json(res.responseHandler(data, '', 200));
    }).catch((err) => {
        res.status(200).json(res.responseHandler('No such workspace exists!'));
    })
}


// Function to activate or deactivate any workspace

exports.activateOrDeactivateWorkspace = (req, res) => {
    var promise = Workspace.findOneAndUpdate({ _id: req.params.id }, { $set: { isActive: req.body.isActive } }, { new: true }).exec();

    promise.then((data) => {
        res.status(200).json(res.responseHandler(data, 'Workspace updated successfully.', 'success'));
    }).catch((err) => {
        if (err && err.n == 0) {
            res.status(200).json(res.responseHandler(err, 'Can not perform this action.', 'failure'));
        }
    });
}

// Function to delete workspace

exports.deleteWorkspace = (req, res) => {
    let channels
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
}