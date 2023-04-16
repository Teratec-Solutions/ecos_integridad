import { io } from "socket.io-client";
import { Usuario } from "../interfaces/Usuario";
const socket = io()
/* const usuario : Usuario = JSON.parse(window.localStorage.getItem('usuario') || '{}') */

const nuevoUsuarioCreado = (usuario: Usuario) => {
    socket.emit('nuevoUsuario', {_id: usuario._id})
}
const usuarioEliminado = (usuario: Usuario) => {
    socket.emit('usuarioEliminado', {_id: usuario._id})
}
const nuevoClienteCreado = (usuario: Usuario) => {
    socket.emit('nuevoCliente', {_id: usuario._id})
}
const clienteEliminado = (usuario: Usuario) => {
    socket.emit('clienteEliminado', {_id: usuario._id})
}

export {
    nuevoUsuarioCreado,
    nuevoClienteCreado,
    clienteEliminado,
    usuarioEliminado
}