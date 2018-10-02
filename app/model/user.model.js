var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    
    first_name: {
        type: String,
        trim: true,
        unique: false
    },
    last_name: {
        type: String,
        trim: true,
        unique: false
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
        required: false
    },
    password: {
        type: String
    },
    workspace_id: [
        {
            type: Schema.Types.ObjectId
        }
    ],
    channels: [
        {
            type: Schema.Types.ObjectId
        }
    ],
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

mongoose.model('user', UserSchema);