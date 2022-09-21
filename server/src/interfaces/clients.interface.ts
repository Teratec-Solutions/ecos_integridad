import { ObjectId } from "mongoose"
import { User } from "./users.interface"

export interface Cliente {
    _id: ObjectId
    empresa: Empresa
    habilitado: boolean
    contratos: Contrato[]
    createdAt: string
    createdBy: User[]
}

export interface Contrato {
    _id: ObjectId
    tipoContrato: string
    descripcion: string
    fechaInicio: Date
    fechaTermino: Date
    createdAt: Date
    supervisores: User[]
    operarios: User[]
    cliente?: ObjectId
}

export interface Empresa {
    nombre: string
    direccion: string
    run: string
    ciudad: string
    pais: string
    telefono: string
    correo: string
    contactos: ContactoEmpresa[]
    imageLogo: string
    location?: {
        lat: string
        lng: string
    }
    alt?: string
}

export interface ContactoEmpresa {
    nombre: string
    apellido: string
    run: string
    telefono: string
    correo: string
    imageProfile: string
}