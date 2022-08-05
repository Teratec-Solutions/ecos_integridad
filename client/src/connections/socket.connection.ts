import { io } from "socket.io-client";
import { Usuario } from "../interfaces/Usuario";
const socket = io()
const usuario : Usuario = JSON.parse(window.localStorage.getItem('usuario') || '{}')

const nuevoUsuarioCreado = () => {
    socket.emit('nuevoUsuario', {_id: usuario._id})
}

export {
    nuevoUsuarioCreado
}