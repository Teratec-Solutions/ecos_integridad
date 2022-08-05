"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const servicio_service_1 = (0, tslib_1.__importDefault)(require("../services/servicio.service"));
const obtenerServicios = async (req, res, next) => {
    console.log('Leyendo servicios');
    try {
        const obtenerServiciosResponse = await servicio_service_1.default.findServicios();
        res.status(200).json({ data: obtenerServiciosResponse, message: 'find all services' });
    }
    catch (error) {
        next(error);
    }
};
const crearServicio = async (req, res, next) => {
    try {
        const servicio = req.body;
        const newServicio = await servicio_service_1.default.createServicio(servicio);
        res.status(201).json({ data: newServicio, message: 'service created' });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
const borrarServicio = async (req, res, next) => {
    try {
        const { servicioId } = req.body;
        const state = await servicio_service_1.default.borrarServicio(servicioId);
        res.status(201).json({ data: state, message: 'service deleted' });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
const obtenerTipoServicios = async (req, res, next) => {
    console.log('Leyendo tipo servicios');
    try {
        const obtenerTipoServiciosResponse = await servicio_service_1.default.findServiciosTipo();
        res.status(200).json({ data: obtenerTipoServiciosResponse, message: 'find all services' });
    }
    catch (error) {
        next(error);
    }
};
const crearTipoServicio = async (req, res, next) => {
    try {
        const tipoServicio = req.body;
        console.log(tipoServicio);
        const newTipoServicio = await servicio_service_1.default.createServicioTipo(tipoServicio);
        res.status(201).json({ data: newTipoServicio, message: 'service type created' });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
const borrarTipoServicio = async (req, res, next) => {
    try {
        const { tipoServicioId } = req.body;
        const state = await servicio_service_1.default.borrarTipoServicio(tipoServicioId);
        res.status(201).json({ data: state, message: 'service type deleted' });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
const obtenerProcedimientos = async (req, res, next) => {
    console.log('Leyendo tipo servicios');
    try {
        const obtenerProcedimientosResponse = await servicio_service_1.default.findProcedimientos();
        res.status(200).json({ data: obtenerProcedimientosResponse, message: 'procedimientos encontrados' });
    }
    catch (error) {
        next(error);
    }
};
const crearProcedimiento = async (req, res, next) => {
    try {
        const procedimiento = req.body;
        console.log(procedimiento);
        const newServicio = await servicio_service_1.default.createProcedimeinto(procedimiento);
        res.status(201).json({ data: newServicio, message: 'procedimiento creado' });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
const borrarProcedimiento = async (req, res, next) => {
    try {
        const { procedimientoId } = req.body;
        const state = await servicio_service_1.default.borrarProcedimiento(procedimientoId);
        res.status(201).json({ data: state, message: 'procedimiento borrado' });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
const obtenerSubMateria = async (req, res, next) => {
    console.log('Leyendo tipo servicios');
    try {
        const obtenerSubMaterias = await servicio_service_1.default.findSubMaterias();
        res.status(200).json({ data: obtenerSubMaterias, message: 'submateria encontradas' });
    }
    catch (error) {
        next(error);
    }
};
const crearSubMateria = async (req, res, next) => {
    try {
        const subMateria = req.body;
        console.log(subMateria);
        const nuevaSubMateria = await servicio_service_1.default.createSubMateria(subMateria);
        res.status(201).json({ data: nuevaSubMateria, message: 'submateria creada' });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
const borrarSubMateria = async (req, res, next) => {
    try {
        const { subMateriaId } = req.body;
        const state = await servicio_service_1.default.borrarSubMateria(subMateriaId);
        res.status(201).json({ data: state, message: 'submateria borrada' });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
const obtenerGestion = async (req, res, next) => {
    console.log('Leyendo gestiones');
    try {
        const obtenerGestionesResponse = await servicio_service_1.default.findGestiones();
        res.status(200).json({ data: obtenerGestionesResponse, message: 'gestiones encontrados' });
    }
    catch (error) {
        next(error);
    }
};
const crearGestion = async (req, res, next) => {
    try {
        const gestion = req.body;
        console.log(gestion);
        const newGestion = await servicio_service_1.default.crearGestion(gestion);
        res.status(201).json({ data: newGestion, message: 'gestion creado' });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
const borrarGestion = async (req, res, next) => {
    try {
        const { gestionId } = req.body;
        const state = await servicio_service_1.default.borrarGestion(gestionId);
        res.status(201).json({ data: state, message: 'gestion borrado' });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
const obtenerGestionDetalle = async (req, res, next) => {
    console.log('Leyendo tipo servicios');
    try {
        const obtenerGestionDetalle = await servicio_service_1.default.findGestionDetalle();
        res.status(200).json({ data: obtenerGestionDetalle, message: 'gestiones detalle encontradas' });
    }
    catch (error) {
        next(error);
    }
};
const crearGestionDetalle = async (req, res, next) => {
    try {
        const gestionDetalle = req.body;
        console.log(gestionDetalle);
        const nuevaGestionDetalle = await servicio_service_1.default.crearGestionDetalle(gestionDetalle);
        res.status(201).json({ data: nuevaGestionDetalle, message: 'gestion detalle creada' });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
const borrarGestionDetalle = async (req, res, next) => {
    try {
        const { gestionDetalleId } = req.body;
        const state = await servicio_service_1.default.borrarGestionDetalle(gestionDetalleId);
        res.status(201).json({ data: state, message: 'gestion detalle borrada' });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.default = {
    obtenerServicios,
    crearServicio,
    borrarServicio,
    obtenerTipoServicios,
    crearTipoServicio,
    borrarTipoServicio,
    obtenerProcedimientos,
    crearProcedimiento,
    borrarProcedimiento,
    obtenerSubMateria,
    crearSubMateria,
    borrarSubMateria,
    crearGestion,
    borrarGestion,
    obtenerGestion,
    crearGestionDetalle,
    borrarGestionDetalle,
    obtenerGestionDetalle
};
/* class ServicioController {
    public servicioService = new ServicioService()
    
    public obtenerServicios = async (req: Request, res: Response, next: NextFunction) => {
        console.log('Leyendo servicios')
        try {
            const obtenerServicios: Servicio[] = await ServicioService.findServicios()
            res.status(200).json({ data: obtenerServicios, message: 'find all services' })
        } catch (error) {
            next(error)
        }
    }

    public crearServicio = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const servicio: Servicio = req.body
            const newServicio = await ServicioService.createServicio(servicio)
            res.status(201).json({ data: newServicio, message: 'service created' })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    public borrarServicio = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {servicioId} = req.body
            const state = await ServicioService.borrarServicio(servicioId)
            res.status(201).json({ data: state, message: 'service deleted' })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    public obtenerTipoServicios = async (req: Request, res: Response, next: NextFunction) => {
        console.log('Leyendo tipo servicios')
        try {
            const obtenerTipoServicios: ServicioTipo[] = await ServicioService.findServiciosTipo()
            res.status(200).json({ data: obtenerTipoServicios, message: 'find all services' })
        } catch (error) {
            next(error)
        }
    }

    public crearTipoServicio = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tipoServicio: ServicioTipo = req.body
            console.log(tipoServicio)
            const newTipoServicio = await ServicioService.createServicioTipo(tipoServicio)
            res.status(201).json({ data: newTipoServicio, message: 'service type created' })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    public borrarTipoServicio = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {tipoServicioId} = req.body
            const state = await ServicioService.borrarTipoServicio(tipoServicioId)
            res.status(201).json({ data: state, message: 'service type deleted' })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    public obtenerProcedimientos = async (req: Request, res: Response, next: NextFunction) => {
        console.log('Leyendo tipo servicios')
        try {
            const obtenerProcedimientos: ServicioTipo[] = await ServicioService.findProcedimientos()
            res.status(200).json({ data: obtenerProcedimientos, message: 'procedimientos encontrados' })
        } catch (error) {
            next(error)
        }
    }

    public crearProcedimiento = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const procedimiento: ServicioTipo = req.body
            console.log(procedimiento)
            const newServicio = await ServicioService.createProcedimeinto(procedimiento)
            res.status(201).json({ data: newServicio, message: 'procedimiento creado' })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    public borrarProcedimiento = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {procedimientoId} = req.body
            const state = await ServicioService.borrarProcedimiento(procedimientoId)
            res.status(201).json({ data: state, message: 'procedimiento norrado' })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    public obtenerSubMateria = async (req: Request, res: Response, next: NextFunction) => {
        console.log('Leyendo tipo servicios')
        try {
            const obtenerSubMaterias: ServicioTipo[] = await ServicioService.findSubMaterias()
            res.status(200).json({ data: obtenerSubMaterias, message: 'submateria encontradas' })
        } catch (error) {
            next(error)
        }
    }

    public crearSubMateria = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const subMateria: ServicioTipo = req.body
            console.log(subMateria)
            const nuevaSubMateria = await ServicioService.createSubMateria(subMateria)
            res.status(201).json({ data: nuevaSubMateria, message: 'submateria creada' })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    public borrarSubMateria = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {subMateriaId} = req.body
            const state = await ServicioService.borrarSubMateria(subMateriaId)
            res.status(201).json({ data: state, message: 'submateria norrada' })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

export default ServicioController */ 
//# sourceMappingURL=servicio.controller.js.map