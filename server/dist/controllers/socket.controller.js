"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const socket_io_1 = (0, tslib_1.__importDefault)(require("socket.io"));
const SocketController = async (server) => {
    console.log('Socket connection');
    const io = new socket_io_1.default.Server(server, {
        cors: {
            origin: '*',
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: false
        },
    });
    io.on('connection', (socket) => {
        socket.on('isConnected', async (data) => {
            console.log('Activado!!!', data);
        });
        socket.on('nuevoUsuario', (data) => {
            io.emit(`actualizar_${data._id}`, { title: 'Actualizados usuarios' });
        });
        socket.on('nuevoCliente', (data) => {
            console.log('Nuevo cliente creado');
            console.log(data);
            io.emit(`nuevoClienteCreado_${data._id}`, { title: 'Actualizados clientes' });
        });
    });
};
exports.default = SocketController;
//# sourceMappingURL=socket.controller.js.map