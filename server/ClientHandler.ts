const robotjs = require('robotjs')
const open = require('open')
import {Key} from './Models'
import Parser from './Parser'
import Shutdown from './Shutdown'
import DisplaySwitch from './DisplaySwitch'

export default class ClientHandler {
    private socket: SocketIO.Socket

    constructor(socket: SocketIO.Socket) {
        this.socket = socket
        socket.on('open', this.handleFileOpen)
        socket.on('key', this.handleKeyboard)
        socket.on('shutdown', this.handleShutdown)
        socket.on('display-switch', this.handleDisplaySwitch)

        const {films, serials} = Parser()
        socket.emit('films', films)
        socket.emit('serials', serials)
    }

    private handleFileOpen = (path: string) => {
        open(path)
    }

    private handleShutdown = () => {
        Shutdown()
    }

    private handleDisplaySwitch = (type: string) => {
        DisplaySwitch(type)
    }

    private handleKeyboard = (k: Key) => {
        if (!k.key) return

        if (k.modifiers && k.modifiers.length > 0) {
            robotjs.keyTap(k.key, k.modifiers);
        } else {
            robotjs.keyTap(k.key);
        }
    }
}
