module.exports = function(app) {
    var index = require('../controller/index.controller')
    var workspace = require('../controller/workspace.controller')
    var channel = require('../controller/channel.controller')
    app.get('/', index.login)
    app.get('/signup', index.signup)
    app.get('/forgot-password', index.forgotPassword)
    app.post('/', index.login)
    app.post('/signup', index.signup)
    app.post('/forgot-password', index.forgotPassword)

    app.post('/workspace', workspace.createWorkspace)
    app.get('/workspace', workspace.getAllWorkspace)
    app.get('/workspace/:id', workspace.getWorkspace)

    app.post('/channel', channel.createChannel)
}