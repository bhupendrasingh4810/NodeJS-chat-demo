var express = require('./config/express');
// mongoose = require('./config/mongoose');

var app = express();
// var db = mongoose();

app.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server running at http://localhost:3000/');
});

module.exports = app;