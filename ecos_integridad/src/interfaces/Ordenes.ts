import { Cliente, Contrato } from "./Cliente"
import { Template } from "./Template"
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
    protocolo: Template[]
    deleted?: boolean
    updatedAt?: string
    createdAt?: string
    nroWo?: number
}

export interface Tarea {
    idTarea: number
    descripcion: string
    imagenes?: []
    locate?: {
        lat: number,
        lng: number,
        alt?: string
    }
}