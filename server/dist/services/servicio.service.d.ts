import { Servicio } from "../interfaces/servicio.interface";
import { ServicioTipo } from "../interfaces/servicioTipo.interface";
declare const _default: {
    findServicios: () => Promise<Servicio[]>;
    createServicio: (servicioData: Servicio) => Promise<Servicio>;
    borrarServicio: (servicioId: string) => Promise<boolean>;
    findServiciosTipo: () => Promise<ServicioTipo[]>;
    createServicioTipo: (servicioTipoData: ServicioTipo) => Promise<ServicioTipo>;
    borrarTipoServicio: (tipoServicioId: string) => Promise<boolean>;
    findProcedimientos: () => Promise<ServicioTipo[]>;
    createProcedimeinto: (procedimientoData: ServicioTipo) => Promise<ServicioTipo>;
    borrarProcedimiento: (procedimientoId: string) => Promise<boolean>;
    findSubMaterias: () => Promise<ServicioTipo[]>;
    createSubMateria: (procedimiento: ServicioTipo) => Promise<ServicioTipo>;
    borrarSubMateria: (subMateriaId: string) => Promise<boolean>;
    findGestiones: () => Promise<ServicioTipo[]>;
    crearGestion: (gestion: ServicioTipo) => Promise<ServicioTipo>;
    borrarGestion: (gestionId: string) => Promise<boolean>;
    findGestionDetalle: () => Promise<ServicioTipo[]>;
    crearGestionDetalle: (gestion: ServicioTipo) => Promise<ServicioTipo>;
    borrarGestionDetalle: (gestionId: string) => Promise<boolean>;
};
export default _default;
