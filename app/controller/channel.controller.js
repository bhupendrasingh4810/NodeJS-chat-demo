var Channel = require('mongoose').model('channel'),
    Workspace = require('mongoose').model('workspace');

exports.createChannel = (req, res) => {
    var channel = new Channel(req.body)
    Channel.find({ channel_name: req.body.channel_name }).then((response) => {
        if (response.length) {
            res.status(200).json(res.responseHandler('Channel already exists!'))
        } else {
            Workspace.update({ _id: req.body.workspace_id }, { $push: { channels: channel._id } }).then((data) => { })
            channel.save((err) => {
                if (err) {
                    res.status(200).json(res.responseHandler('Channel couldn\'t be created'))
                } else {
                    res.status(200).json(res.responseHandler(channel, 'Channel created successfully!', 200))
                }
            })
        }
    })
}

exports.getAllChannel = (req, res) => {
    Channel.find({}).then((data) => {
        if (!data.length) {
            res.status(200).json(res.responseHandler(data, 'No channel found.', 200))
        } else {
            res.status(200).json(res.responseHandler(data, '', 200))
        }
    })
}

exports.getChannel = (req, res) => {
    Channel.find({ _id: req.params.id }).then((data) => {
        if (!data.length) {
            res.status(200).json(res.responseHandler(data, 'No channel found.', 200))
        } else {
            res.status(200).json(res.responseHandler(data, '', 200))
        }
    })
}

exports.activateOrDeactivateChannel = (req, res) => {
    Channel.updateOne({_id: req.params.id}, {$set: {isActive: req.body.value}}).then((err, data) => {
        if(err && err.n == 0) {
            res.status(200).json(res.responseHandler(err, 'Can not perform this action.', 'failure'))
        } else res.status(200).json(res.responseHandler(data, 'Channel updated successfully.', 'success'))
    })
}

exports.deleteChannel = (req, res) => {
    Channel.deleteOne({_id: req.params.id}).then((err,data) => {
        if(err && err.n == 0) {
            res.status(200).json(res.responseHandler(err, 'Channel does not exists.', 'success'))
        } else res.status(200).json(res.responseHandler(data, 'Channel deleted successfully.', 'success'))
    })
}