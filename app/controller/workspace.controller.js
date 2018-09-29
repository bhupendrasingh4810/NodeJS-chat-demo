var mongoose = require('mongoose'),
    User = require('mongoose').model('user'),
    Workspace = require('mongoose').model('workspace');

exports.createWorkspace = (req, res) => {
    if (req.method == 'POST') {
        var workspace = new Workspace(req.body)
        Workspace.find({ email: req.body.email }).then((data) => {
            if (data.length) {
                res.status(200).json(res.responseHandler('Workspace already exists!'))
            } else {
                workspace.save((err) => {
                    if (err) {
                        return res.status(200).json(res.responseHandler(workspace, err));
                    } else {
                        res.status(200).json(res.responseHandler(workspace, 'Workspace successfully created!', 200));
                    }
                });
            }
        })
    }
}

exports.getAllWorkspace = (req, res) => {
    if (req.method == 'GET') {
        Workspace.find({}).then((data) => {
            if (!data.length) {
                res.status(200).json(res.responseHandler('No workspace exists!'))
            } else {
                res.status(200).json(res.responseHandler(data, '', 200))
            }
        })
    }
}

exports.getWorkspace = (req, res) => {
    if (req.method == 'GET' && req.params.id) {
        Workspace.find({ _id: req.params.id }).then((data) => {
            if (!data.length) {
                res.status(200).json(res.responseHandler('No such workspace exists!'))
            } else {
                res.status(200).json(res.responseHandler(data, '', 200))
            }
        })
    }
}