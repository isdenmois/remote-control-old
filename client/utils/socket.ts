export const socket: SocketIOClient.Socket = io()

export function open(path: string) {
    socket.emit('open', path)
}

export default function (type: string, data: any) {
    socket.emit(type, data)
}
