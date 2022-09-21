import { Usuario } from "./Usuario"

export interface Cliente {
    _id: string | null
    empresa: Empresa
    habilitado?: boolean
    contratos?: Contrato[]
    createdAt?: Date
    createdBy?: Usuario[]
}

export interface Contrato {
    _id?: string
    tipoContrato?: string
    descripcion?: string
    fechaInicio?: Date
    fechaTermino?: Date
    createdAt?: Date
    supervisores?: Usuario[]
    operarios?: Usuario[]
    cliente: string
}

export interface Empresa {
    nombre: string
    direccion?: string
    run: string
    ciudad?: string
    region?: string
    pais?: string
    telefono: string
    correo: string
    contactos?: ContactoEmpresa[]
    imageLogo?: string
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
    imageProfile?: string
}