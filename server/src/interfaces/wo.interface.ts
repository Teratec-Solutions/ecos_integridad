import { ObjectId } from "mongoose"
import { Cliente } from "./clients.interface"
import { User } from "./users.interface"

export interface Orden {
    _id: ObjectId
    asignado: User[]
    createdBy: string
    fechaInicio: Date
    fechaTermino: Date
    tareas: Tarea[]
    cliente: Cliente[]
    deleted: boolean
    updatedAt: string
    createdAt: string
}

export interface Tarea {
    idOrden: string
}