const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const proxy = require('express-http-proxy');
const url = require('url');

/**
 * Add webpack middleware.
 */
app.use('/api', proxy('localhost:8080', {
  forwardPath: function(req, res) {
    const path = url.parse(req.url).path;
    console.log(path);
    return `/api${path}`;
  }
}));
require('./middleware')(app);
server.listen(3000);
