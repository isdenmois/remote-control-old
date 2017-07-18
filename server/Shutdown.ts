import {spawn} from 'child_process'
import * as path from 'path'


export default function () {
    const args = [ '/s', '/d', 'u:4:5', '/f', '/t', '0' ]
    const prog = path.join(process.env.SystemRoot as string, 'System32', 'shutdown.exe')
    return spawn(prog, args, {})
}
