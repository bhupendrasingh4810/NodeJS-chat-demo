var config = require('./environment/development'),
    mongoose = require('mongoose');

module.exports = (req, res) => {
    var db = mongoose.connect(config.db, { useCreateIndex:true, useNewUrlParser: true })

    require('../app/model/user.model');
    require('../app/model/workspace.model')
    require('../app/model/channel.model')
    require('../app/model/session.model')

    return db;
}