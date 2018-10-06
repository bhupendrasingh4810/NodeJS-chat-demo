'use strict'

var Channel = require('mongoose').model('channel'),
    Workspace = require('mongoose').model('workspace');

// Function to create a channel

exports.createChannel = (req, res) => {
    var channel = new Channel(req.body)
    var createChannel = Channel.find({ channel_name: req.body.channel_name }).exec();

    createChannel.then(() => {
        return channel.save();
    }).then(() => {
        var updateWorkspace = Workspace.updateOne({ _id: req.body.workspace_id }, { $push: { channels: channel._id } }).exec();

        updateWorkspace.then(() => {
            res.status(200).json(res.responseHandler(channel, { 'success': 'Channel created successfully!' }, 'success'));
        });
    }).catch((err) => {
        if (err.code == 11000) {
            res.status(200).json(res.responseHandler([], { 'error': 'Channel already exists!' }, 'success'));
        } else res.status(200).json(res.responseHandler([], { 'error': 'Channel couldn\'t be created' }, 'failure'));
    });
}

// Function to get all the channels

exports.getAllChannel = (req, res) => {
    var getChannel = Channel.find({ isActive: true }).exec();

    getChannel.then((data) => {
        res.status(200).json(res.responseHandler(data, '', 200));
    }).catch((err) => {
        res.status(200).json(res.responseHandler(data, 'No channel found.', 200));
    });
}

// Function to get a specific channel

exports.getChannel = (req, res) => {
    var getChannel = Channel.find({ _id: req.params.id, isActive: true }).exec();

    getChannel.then((channel) => {
        res.status(200).json(res.responseHandler(channel, '', 200));
    }).catch((err) => {
        res.status(200).json(res.responseHandler([], 'No channel found.', 200));
    });
}

// Function to activate or deactivate channel

exports.activateOrDeactivateChannel = (req, res) => {
    var activateOrDeactivateChannel = Channel.findOneAndUpdate({ _id: req.params.id }, { $set: { isActive: req.body.value } }, { new: true }).exec();

    activateOrDeactivateChannel.then((channel) => {
        res.status(200).json(res.responseHandler(channel, 'Channel updated successfully.', 'success'));
    }).catch((err) => {
        res.status(200).json(res.responseHandler([], 'Can not perform this action.', 'failure'));
    });
}

// Function to delete channel

exports.deleteChannel = (req, res) => {
    var deleteChannel = Channel.deleteOne({ _id: req.params.id }).exec();

    deleteChannel.then(() => {
        Workspace.update({ _id: req.body.workspace_id }, { $pull: { channels: req.params.id } }).then(() => {
            res.status(200).json(res.responseHandler([], 'Channel deleted successfully.', 'success'));
        });
    }).catch((err) => {
        if (err && err.n == 0) {
            res.status(200).json(res.responseHandler(err, 'Channel does not exists.', 'success'));
        }
    });
}