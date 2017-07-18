import {spawn, exec}  from 'child_process'
import * as path from 'path'
const portAudio = require('naudiodon')


interface AudioDevice {
    name: string
}

function changeSound(type: string) {
    let to
    if (type === 'internal') {
        to = 'AAA'
        const devices: AudioDevice[] = portAudio.getDevices()
        devices.forEach(device => {
            if (device.name.startsWith('AAA')) {
                to = device.name.substr(0, device.name.indexOf(' '))
            }
        })
    } else {
        to = 'Динамики'
    }
    console.log(`=======================${to}========================`)

    return exec(`nircmd setdefaultsounddevice ${to}`)
}

export default function (type: string) {
    const args = [ `/${type}` ]
    const prog = path.join(process.env.SystemRoot as string, 'System32', 'DisplaySwitch.exe')
    const child = spawn(prog, args, {})
    child.on('close', () => setTimeout(() => changeSound(type), 5000))

    return child
}
