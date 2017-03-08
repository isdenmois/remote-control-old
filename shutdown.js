const spawn = require('child_process').spawn;
const path = require('path');

module.exports = function () {
    const args = [ '/s', '/d', 'u:4:5', '/f', '/t', '0' ];
    const prog = path.join(process.env.SystemRoot, 'System32', 'shutdown.exe');
    return spawn(prog, args, {});
};
