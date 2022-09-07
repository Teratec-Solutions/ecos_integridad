import { Cliente } from "./Cliente"
import { Usuario } from "./Usuario"

export interface Ordenes {
    _id: string
    asignado: Usuario[]
    createdBy: string
    fechaInicio: Date
    fechaTermino: Date
    tareas: Tarea[]
    cliente: Cliente[]
    updatedAt: string
    createdAt: string
}

export interface Tarea {
    idOrden: string
}