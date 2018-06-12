module.exports = function(app) {
    var index = require('../controller/index.controller')
    app.get('/', index.login)
    app.get('/signup', index.signup)
    app.get('/forgot-password', index.forgotPassword)
    app.post('/', index.login)
    app.post('/signup', index.signup)
    app.post('/forgot-password', index.forgotPassword)
}