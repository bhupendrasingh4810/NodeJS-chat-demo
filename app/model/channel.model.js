var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChannelSchema = new Schema({

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