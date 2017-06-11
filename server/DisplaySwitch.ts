import {spawn, exec}  from 'child_process'
import * as path from 'path'


function changeSound(type: string) {
    const to = type === 'internal' ? 'AAA-8' : 'Динамики'
    console.dir(to)
    return exec(`nircmd setdefaultsounddevice ${to}`)
}

export default function (type: string) {
    const args = [ `/${type}` ]
    const prog = path.join(process.env.SystemRoot, 'System32', 'DisplaySwitch.exe')
    const child = spawn(prog, args, {})
    child.on('close', () => setTimeout(() => changeSound(type), 5000))

    return child
}
