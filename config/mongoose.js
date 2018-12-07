var config = require('./environment/development'),
    mongoose = require('mongoose');

module.exports = () => {
    const db = mongoose.connect(config.db, { useCreateIndex: true, useNewUrlParser: true })
        .then(() => console.log('Mongodb connected'))
        .catch(err => console.log(err));

    require('../app/model/user.model');
    require('../app/model/workspace.model')
    require('../app/model/channel.model')
    require('../app/model/session.model')
    require('../app/model/chat.model')

    return db;
}