var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WorkspaceSchema = new Schema({

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