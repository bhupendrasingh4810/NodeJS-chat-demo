const express = require('./config/express');
const app = express();

const start = async () => {
    try {
        await app.listen(3000);
        console.log('Server running at http://localhost:3000/');

    } catch (err) {
        console.error(err);
        process.exit(); // Process object is a global variable that lets us manage the current Node.js process.
    }
}

start();
module.exports = app;