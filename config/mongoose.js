var config = require('./environment/development'),
    mongoose = require('mongoose');

module.exports = (req, res) => {
    var db = mongoose.connect('mongodb://localhost:27017/chat', { useCreateIndex:true, useNewUrlParser: true })

    require('../app/model/user.model');
    require('../app/model/workspace.model')
    require('../app/model/channel.model')

    return db;
}