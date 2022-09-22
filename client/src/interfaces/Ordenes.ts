import { Cliente, Contrato } from "./Cliente"
import { Usuario } from "./Usuario"

export interface Ordenes {
    _id?: string
    asignado?: Usuario[]
    supervisor: Usuario[]
    prioridad: string
    createdBy?: string
    lastEditedBy?: string
    descripcion: string
    fechaInicio?: Date
    fechaTermino?: Date
    tareas?: Tarea[]
    cliente?: Cliente[]
    contrato?: Contrato[]
    deleted?: boolean
    updatedAt?: string
    createdAt?: string
    nroWo?: number
}

export interface Tarea {
    idOrden: string
}