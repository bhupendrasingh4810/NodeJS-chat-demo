'user strict'

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    uuidv4 = require('uuid/v4');

var ChatSchema = new Schema({
    conversation_id: {
        type: String,
        default: function () {
            return uuidv4()
        }
    },
    sender_id: {
        type: String,
        required: true
    },
    receiver_id: {
        type: String,
        required: true
    },
    message: {
        type: String
    }
});

mongoose.model('chat', ChatSchema);