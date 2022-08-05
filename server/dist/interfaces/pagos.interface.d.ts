export interface Cuota {
    fechaVencimiento?: Date;
    fechaDePago?: Date;
    monto?: string;
    montoPagado?: string;
    nroBoletaHonorarios?: string;
    fechaBoletaHonorarios?: string;
}
export interface Pagos {
    cuotas: Cuota[];
    total: string;
    totalPagado: string;
    totalRestante: string;
    observaciones: string;
}
