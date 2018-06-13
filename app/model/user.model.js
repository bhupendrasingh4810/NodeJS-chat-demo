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
    admin_password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean
    }
});

mongoose.model('user', UserSchema);