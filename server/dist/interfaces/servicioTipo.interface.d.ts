import { ObjectId } from "mongoose";
export interface ServicioTipo {
    _id: ObjectId;
    nombre: string;
    creadoPor: ObjectId;
    descripcion: string;
}
