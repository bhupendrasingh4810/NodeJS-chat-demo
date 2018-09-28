var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    role: {
        type: String
    },
    first_name: {
        type: String,
        trim: true,
        unique: false,
        required: true
    },
    last_name: {
        type: String,
        trim: true,
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
    admin_address: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true
    },
    isVerified: {
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

mongoose.model('user', UserSchema);