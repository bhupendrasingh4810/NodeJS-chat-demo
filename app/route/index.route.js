module.exports = function (app) {
    var index = require('../controller/index.controller')
    var workspace = require('../controller/workspace.controller')
    var channel = require('../controller/channel.controller')
    var user = require('../controller/user.controller')

    app.post('/login', index.login)
    app.post('/forgot-password', index.forgotPassword)
    app.post('/token', index.generateToken)
    app.put('/change-password/:id', index.changePassword)
    app.post('/logout', index.logout)

    app.post('/workspace', workspace.createWorkspace)
    app.put('/workspace-status/:id', workspace.activateOrDeactivateWorkspace)
    app.put('/workspace/:id', workspace.updateWorkspace)
    app.get('/workspace', workspace.getAllWorkspace)
    app.get('/workspace/:id', workspace.getWorkspace)
    app.delete('/workspace/:id', workspace.deleteWorkspace)

    app.post('/channel', channel.createChannel)
    app.put('/channel-status/:id', channel.activateOrDeactivateChannel)
    app.put('/channel/:id', channel.updateChannel)
    app.get('/channel', channel.getAllChannel)
    app.get('/channel/:id', channel.getChannel)
    app.delete('/channel/:id', channel.deleteChannel)

    app.post('/user', user.createUser)
    app.put('/user', user.userSignUp)
    app.put('/user-status/:id', user.activateOrDeactivateUser)
    app.get('/user', user.getAllUser)
    app.get('/user/:id', user.getUser)
    app.delete('/user/:id', user.deleteUser)
}