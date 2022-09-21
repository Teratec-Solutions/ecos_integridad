export interface Usuario {
    _id: string
    nombre?: string
    apellido1?: string
    apellido2?: string
    fullName?: string
    run?: string
    fono?: string
    direccion?: string
    region?: string
    ciudad?: string
    comuna?: string
    depto?: string
    profesion?: string
    nacionalidad?: string
    estadoCivil?: string
    sueldoBase?: string
    comision?: string
    email?: string
    password?: string,
    emailVerifiedAt?: Date
    estado?: boolean
    fechaTitulacion?: string
    imagenPerfil?: string
    role?: string
    subRoles?: string[]
    createdAt?: Date
}
