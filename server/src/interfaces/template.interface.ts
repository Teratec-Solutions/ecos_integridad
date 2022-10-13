import { ObjectId } from "mongoose"
import { Cliente, Contrato } from "./clients.interface"
import { User } from './users.interface'
export interface Template {
    _id?: ObjectId
    nombrePlanilla?: string
    informacion?: Informacion[]
    contenido?: GrupoTareas[]
    responsablesInternos?: Responsable[]
    responsablesExternos?: ResponsableExterno[]
    contrato: Contrato[]
    cliente: Cliente[]
    seleccionado?: boolean
    createdAt?: Date
    updatedAt?: Date
}

export interface Informacion {
    nombreDato?: string
    tipoDato?: string
}

export interface GrupoTareas {
    titulo: string
    tareas: Tarea[]
    totalRespuestas?: number
    elementos?: Elemento[]
}

export interface Tarea {
    id?: number
    nroTarea?: number
    descripcionTarea?: string
    observaciones?: string
    respuestas?: Respuesta[]
    imagenes?: Imagen[]
}

export interface Elemento {
    descripcion?: string
    respuesta?: string | number | boolean
}

export interface Respuesta {
    habilitado?: boolean
    valorRespuesta?: string | number | boolean
}

export interface Imagen {
    urlBase64?: string
    url?: string
    metadata?: {
        autor?: string
        localizacion?: {
            lat?: number
            lng?: number
        }
    }
}

export interface Responsable {
    responsable?: User
    fecha?: Date
    firma?: string
}

export interface ResponsableExterno {
    responsable?: {
        nombre?: string
        apellido?: string
    }
    fecha?: Date
    firma?: string
}