import { ObjectId } from "mongoose"
import { Cliente, Contrato } from "./clients.interface"
import { Template } from "./template.interface"
import { User } from "./users.interface"

export interface Orden {
    _id: ObjectId
    asignado: User[]
    supervisor: User[]
    prioridad: string
    createdBy: string
    descripcion: string
    fechaInicio: Date
    fechaTermino: Date
    fechaInicioEjecucion: Date
    fechaTerminoEjecucion: Date
    tareas: Tarea[]
    cliente: Cliente[]
    contrato?: Contrato[]
    protocolo: Template[]
    deleted: boolean
    updatedAt: string
    createdAt: string
    nroWo: number
}

export interface Tarea {
    idOrden: string
}