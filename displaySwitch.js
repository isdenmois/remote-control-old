const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const path = require('path');

function changeSound(type) {
    const to = type === 'internal' ? 'AAA-8' : 'Динамики';
    console.dir(to);
    return exec(`nircmd setdefaultsounddevice ${to}`);
}

module.exports = function (type) {
    const args = [ `/${type}` ];
    const prog = path.join(process.env.SystemRoot, 'System32', 'DisplaySwitch.exe');
    const child = spawn(prog, args, {});
    child.on('close', () => setTimeout(() => changeSound(type), 5000));

    return child;
};
