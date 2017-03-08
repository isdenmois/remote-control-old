const spawn = require('child_process').spawn;
const path = require('path');

module.exports = function (type) {
    const args = [ `/${type}` ];
    const prog = path.join(process.env.SystemRoot, 'System32', 'DisplaySwitch.exe');
    return spawn(prog, args, {});
};
