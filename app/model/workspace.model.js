'use strict'
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    uuidv4 = require('uuid/v4'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var WorkspaceSchema = new Schema({

    _id: {
        type: String,
        default: function () {
            return uuidv4()
        }
    },
    workspace_name: {
        type: String,
        unique: false,
        required: true
    },
    owner_name: {
        type: String,
        unique: false,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /.+\@.+\..+/
    },
    mobile_no: {
        type: String,
        unique: true,
        required: true
    },
    members: [
        {
            type: String
        }
    ],
    channels: [
        {
            type: String
        }
    ],
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean
    },
    isActive: {
        type: Boolean,
        default: false,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: true,
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

mongoose.model('workspace', WorkspaceSchema);

WorkspaceSchema.pre('save', function (next) {
    var workspace = this;
    if (!workspace.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(workspace.password, salt, (err, hash) => {
            if (err) return next(err);

            workspace.password = hash;
            next();
        });
    });
});