import * as express from 'express'
import * as ioServer from 'socket.io'
import * as path from 'path'

import {Handlers} from './Models'
import ClientHandler from './ClientHandler'
import {updateData} from './Parser'


module.exports = class Server {
    private server: any
    private app: express.Application
    private io: SocketIO.Server
    private handlers: Handlers<ClientHandler> = {}
    private cons: number = 0

    constructor() {
        this.app = express()
        this.server = require('http').createServer(this.app)

        this.io = ioServer(this.server)
        this.io.on('connection', this.handleConnection)

        if (process.env.NODE_ENV === 'production') {
            this.app.get('*', (req: express.Request, res: express.Response) => {
                const isFile = req.url.endsWith('.css') || req.url.endsWith('.js')
                const p = path.join(__dirname, '..', isFile ? req.url : 'static/index.html')
                res.sendFile(p)
            })
        } else {
            const middleware = require('./Middleware.ts').default
            middleware(this.app)
        }

        this.getData()
        setInterval(this.getData, 30000)
    }

    public listen() {
        const port = process.env.NODE_ENV === 'production' ? 80 : 8080
        this.server.listen(port)
    }

    private handleConnection = (socket: SocketIO.Socket) => {
        const con = this.cons++
        this.handlers[con] = new ClientHandler(socket)
        socket.on('disconnect', () => delete this.handlers[con])
    }

    private getData = async () => {
        const {films, serials} = await updateData()
        this.io.emit('films', films)
        this.io.emit('serials', serials)
    }
}
