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
            io.emit(`actualizar_${data._id}`, {title: 'Actualizados usuarios'})
        })
        socket.on('nuevoCliente', (data) => {
            console.log('Nuevo cliente creado')
            console.log(data)
            io.emit(`nuevoClienteCreado_${data._id}`, {title: 'Actualizados clientes'})
        })
    })
}
export default SocketController