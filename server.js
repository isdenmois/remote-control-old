const config = require('./config.json');
const parser = require('./parser');
const express = require('express');
const robotjs = require('robotjs');
const open = require('open');
const shutdown = require('./shutdown');
const displaySwitch = require('./displaySwitch');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

/**
 * Add webpack middleware.
 */
if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        let p;
        if (req.url.endsWith('.css') || req.url.endsWith('.js')) {
            p = path.join(__dirname, 'static', req.url);
        } else {
            p = path.join(__dirname, 'static', 'index.html');
        }

        res.sendFile(p);
    });
} else {
    require('./middleware')(app);
}

const clients = [];
let data = {};

function getData() {
    parser()
        .then(d => {
            data = d;
            io.emit('films', data.films || []);
            io.emit('serials', data.serials || []);
        });
}

io.on('connection', function(client) {
    client.on('data', (type) => {
        client.emit(type, data[type]);
    });

    client.on('open', open);

    client.on('keyboard', (k) => {
        if (!k.key) {
            return;
        }

        if (k.key === 'shutdown') {
            shutdown();
            return;
        }

        if (k.key === 'displayswitch') {
            displaySwitch(k.modifiers[0]);
            return;
        }

        if (k.modifiers) {
            robotjs.keyTap(k.key, k.modifiers);
        } else {
            robotjs.keyTap(k.key);
        }
    });
});

server.listen(process.env.NODE_ENV === 'production' ? 80 : 8080);
getData();
setInterval(getData, 30000);
