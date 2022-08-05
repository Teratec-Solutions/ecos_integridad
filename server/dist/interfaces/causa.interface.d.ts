import { ObjectId } from "mongoose";
import { Pagos } from "./pagos.interface";
export interface Causa {
    _id: string;
    cliente?: ObjectId;
    abogado?: ObjectId;
    numeroCausa: string;
    state: boolean;
    materia?: ObjectId;
    subMateria: ObjectId;
    procedimiento?: ObjectId;
    nombre?: string;
    honorarios?: string;
    formaDePago?: string;
    detalleFormaDePago?: string;
    medioDePago?: string;
    detalleMedioDePago?: string;
    rolrit?: string;
    corte?: string;
    tribunal?: string;
    caratula?: string;
    observaciones?: string;
    creadoPor?: ObjectId;
    createdAt: Date;
    updatedAt: Date;
    closedAt: Date;
    cerradoPor?: ObjectId;
    servicios: ObjectId[];
    pagos: Pagos;
    gestionesCausa: GestionCausa[];
    gestionesDetallesCausa: GestionDetalleCausa[];
}
export interface GestionCausa {
    _id: string;
    tipo: string;
    detalle: string;
    descripcion: string;
    fechaProgramada: string;
    fechaEjecucion: string;
    fechaAlerta: string;
    provision: string;
    costo: string;
    medioDePago: string;
    createdAt: Date;
    updatedAt: Date;
    creadoPor?: string;
    procuradores?: [];
}
export interface GestionDetalleCausa {
    _id: string;
    tipo: string;
    descripcion: string;
    createdAt: Date;
    updatedAt: Date;
    creadoPor?: string;
}
