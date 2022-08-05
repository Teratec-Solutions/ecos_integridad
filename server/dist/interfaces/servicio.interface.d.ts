import { ObjectId } from "mongoose";
export interface Servicio {
    _id: ObjectId;
    nombre: string;
    tipo: string;
    fechaSolicitud: Date;
    fechaMeta: Date;
    fechaAlerta: Date;
    procurador: ObjectId;
    fechaReal: Date;
    costo: string;
    medioDePago: string;
    creadoPor: string;
    descripcion: string;
    createdAt: Date;
    updatedAt: Date;
}
