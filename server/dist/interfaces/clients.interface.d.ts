import { ObjectId } from "mongoose";
export interface Cliente {
    _id: ObjectId;
    empresa: Empresa;
    habilitado: boolean;
    contratos: Contrato[];
}
export interface Contrato {
    _id: ObjectId;
    tipoContrato: string;
    fechaInicio: Date;
    fechaTermino: Date;
}
export interface Empresa {
    nombre: string;
    direccion: string;
    run: string;
    ciudad: string;
    pais: string;
    telefono: string;
    correo: string;
    contactos: ContactoEmpresa[];
}
export interface ContactoEmpresa {
    nombre: string;
    apellido: string;
    run: string;
    telefono: string;
    correo: string;
}
