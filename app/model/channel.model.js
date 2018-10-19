'use strict'
var mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4'),
    Schema = mongoose.Schema;

var ChannelSchema = new Schema({

    _id: {
        type: String,
        default: function () {
            return uuidv4()
        }
    },
    channel_name: {
        type: String,
        unique: true,
        required: true
    },
    workspace_id: {
        type: String
    },
    users: [],
    status: {
        type: Boolean
    },
    isActive: {
        type: Boolean,
        default: false,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    }
});

mongoose.model('channel', ChannelSchema);