export interface Cliente {
    _id: string
    empresa: Empresa
    habilitado: boolean
    contratos: Contrato[]
    createdAt: string
}

export interface Contrato {
    _id: string
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
    location: {
        lat: string
        lng: string
    }
    alt: string
}

export interface ContactoEmpresa {
    nombre: string
    apellido: string
    run: string
    telefono: string
    correo: string
    imageProfile: string
}