import { ObjectId } from 'mongoose';
export interface User {
    _id: ObjectId;
    nombre: string;
    apellido1: string;
    apellido2: string;
    fullName: string;
    run: string;
    fono: string;
    direccion?: string;
    region?: string;
    ciudad?: string;
    comuna?: string;
    depto?: string;
    profesion?: string;
    nacionalidad?: string;
    estadoCivil?: string;
    sueldoBase?: string;
    comision?: string;
    email: string;
    password: string;
    emailVerifiedAt: Date;
    estado: boolean;
    fechaTitulacion?: string;
    imagenPerfil: string;
    role: string;
    createdAt: string;
}