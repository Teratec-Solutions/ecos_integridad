import socketIo from 'socket.io'

const SocketController = async (server: any) => {
    console.log('Socket connection')
    const io = new socketIo.Server(server, {
        cors: {
            origin: '*',
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: false
        },
    })
    io.on('connection', (socket) => {
        socket.on('isConnected', async (data) => {
            console.log('Activado!!!', data)
        })
        socket.on('nuevoUsuario', (data) => {
            io.emit(`nuevoUsuario_${data._id}`, {title: 'Actualizados usuarios'})
        })
        socket.on('usuarioEliminado', (data) => {
            io.emit(`usuarioEliminado_${data._id}`, {title: 'Eliminado usuarios'})
        })
        socket.on('nuevoCliente', (data) => {
            io.emit(`nuevoClienteCreado_${data._id}`, {title: 'Actualizados clientes'})
        })
        socket.on('clienteEliminado', (data) => {
            io.emit(`clienteEliminado_${data._id}`, {title: 'Eliminado cliente'})
        })
    })
}
export default SocketController