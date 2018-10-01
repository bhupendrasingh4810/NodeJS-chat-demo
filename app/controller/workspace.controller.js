var Workspace = require('mongoose').model('workspace'),
    Channel = require('mongoose').model('channel');

exports.createWorkspace = (req, res) => {
    var workspace = new Workspace(req.body)
    Workspace.find({ email: req.body.email }).then((data) => {
        if (data.length) {
            res.status(200).json(res.responseHandler('Workspace already exists!'));
        } else {
            workspace.save((err) => {
                if (err) {
                    return res.status(200).json(res.responseHandler(workspace, err));
                } else {
                    res.status(200).json(res.responseHandler(workspace, 'Workspace successfully created!', 200));
                }
            });
        }
    });
}

exports.getAllWorkspace = (req, res) => {
    Workspace.find({ isActive: true }).then((data) => {
        if (!data.length) {
            res.status(200).json(res.responseHandler('No workspace exists!'));
        } else {
            res.status(200).json(res.responseHandler(data, '', 200));
        }
    });
}

exports.getWorkspace = (req, res) => {
    Workspace.find({ _id: req.params.id, isActive: true }).then((data) => {
        if (!data.length) {
            res.status(200).json(res.responseHandler('No such workspace exists!'));
        } else {
            res.status(200).json(res.responseHandler(data, '', 200));
        }
    });
}


exports.activateOrDeactivateWorkspace = (req, res) => {
    Workspace.updateOne({ _id: req.params.id }, { $set: { isActive: req.body.value } }).then((data, err) => {
        if (err && err.n == 0) {
            res.status(200).json(res.responseHandler(err, 'Can not perform this action.', 'failure'));
        } else res.status(200).json(res.responseHandler([], 'Workspace updated successfully.', 'success'));
    });
}

exports.deleteWorkspace = (req, res) => {
    Workspace.find({ _id: req.params.id }).then((response) => {
        let channels = response[0].channels
        Workspace.deleteOne({ _id: req.params.id }).then((err, data) => {
            if (err && err.n == 0) {
                res.status(200).json(res.responseHandler(err, 'Workspace does not exists.', 'success'));
            } else {
                Channel.remove({ _id: { $in: channels } }).then((err) => { })
                res.status(200).json(res.responseHandler(data, 'Workspace deleted successfully.', 'success'));
            }
        });
    });
}