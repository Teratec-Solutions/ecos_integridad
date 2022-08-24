import { ObjectId } from "mongoose"

export interface Cliente {
    _id: ObjectId
    empresa: Empresa
    habilitado: boolean
    contratos: Contrato[]
    createdAt: string
}

export interface Contrato {
    _id: ObjectId
    tipoContrato: string
    fechaInicio: Date
    fechaTermino: Date
    createdAt: string
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
}

export interface ContactoEmpresa {
    nombre: string
    apellido: string
    run: string
    telefono: string
    correo: string
    imageProfile: string
}