'user strict'

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    uuidv4 = require('uuid/v4');

var SessionSchema = new Schema({
    session: {
        type: String,
        default: uuidv4()
    },
    ip: {
        type: String
    },
    user_id: {
        type: String
    },
    token: {
        type: String
    }
});

mongoose.model('session', SessionSchema);