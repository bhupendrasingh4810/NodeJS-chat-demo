'use strict'

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    uuidv4 = require('uuid/v4'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({

    _id: {
        type: String,
        default: function () {
            return uuidv4()
        }
    },
    first_name: {
        type: String,
        trim: true,
        unique: false,
        validate: [
            (first_name) => {
                return first_name.length > 0;
            },
            'First name is required.'
        ]
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
        type: Number,
        required: false,
        unique: false
    },
    password: {
        type: String,
        required: true
    },
    workspace_id: [
        {
            type: String
        }
    ],
    channels: [
        {
            type: String
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
    online: {
        type: Boolean,
        default: false
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

UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});