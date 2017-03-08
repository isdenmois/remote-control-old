const config = require('./config.json');
const parser = require('./parser');
const express = require('express');
const robotjs = require('robotjs');
const open = require('open');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
/**
 * Add webpack middleware.
 */
require('./middleware')(app);

Promise.all([
    parser()
]).then(([data]) => {
    io.on('connection', function(client) {
        client.on('data', (type) => {
            console.log('on data, ', type);
            client.emit(type, data[type]);
        });

        client.on('open', open);

        client.on('keyboard', (k) => {
            console.log('on keyboard', k);
            if (!k.key) {
                return;
            }

            if (k.modifiers) {
                robotjs.keyTap(k.key, k.modifiers);
            } else {
                robotjs.keyTap(k.key);
            }
        });
    });

    console.log('start server');
    server.listen(8080);
});
