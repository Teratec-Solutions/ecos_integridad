"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const procedimiento_model_1 = (0, tslib_1.__importDefault)(require("../models/procedimiento.model"));
const servicio_model_1 = (0, tslib_1.__importDefault)(require("../models/servicio.model"));
const servicioTipo_model_1 = (0, tslib_1.__importDefault)(require("../models/servicioTipo.model"));
const subMateria_model_1 = (0, tslib_1.__importDefault)(require("../models/subMateria.model"));
const gestiones_model_1 = (0, tslib_1.__importDefault)(require("../models/gestiones.model"));
const gestionesDetalle_model_1 = (0, tslib_1.__importDefault)(require("../models/gestionesDetalle.model"));
const servicio = servicio_model_1.default;
const servicioTipo = servicioTipo_model_1.default;
const procedimiento = procedimiento_model_1.default;
const subMateria = subMateria_model_1.default;
const gestiones = gestiones_model_1.default;
const gestionesDetalle = gestionesDetalle_model_1.default;
const findServicios = async () => {
    const servicios = await servicio.find({});
    return servicios;
};
const createServicio = async (servicioData) => {
    const createServicioState = await servicio.create(servicioData);
    return createServicioState;
};
const borrarServicio = async (servicioId) => {
    try {
        const state = await servicio.findByIdAndDelete(servicioId);
        if (state) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
};
const findServiciosTipo = async () => {
    const servicios = await servicioTipo.find({});
    return servicios;
};
const createServicioTipo = async (servicioTipoData) => {
    const createServicioTipoState = await servicioTipo.create(servicioTipoData);
    return createServicioTipoState;
};
const borrarTipoServicio = async (tipoServicioId) => {
    try {
        const state = await servicioTipo.findByIdAndDelete(tipoServicioId);
        if (state) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
};
const findProcedimientos = async () => {
    const procedimientoRes = await procedimiento.find({});
    return procedimientoRes;
};
const createProcedimeinto = async (procedimientoData) => {
    const createProcedimientoState = await procedimiento.create(procedimientoData);
    return createProcedimientoState;
};
const borrarProcedimiento = async (procedimientoId) => {
    try {
        const state = await procedimiento.findByIdAndDelete(procedimientoId);
        if (state) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
};
const findSubMaterias = async () => {
    const subMateriaRes = await subMateria.find({});
    return subMateriaRes;
};
const createSubMateria = async (procedimiento) => {
    const createSubMateria = await subMateria.create(procedimiento);
    return createSubMateria;
};
const borrarSubMateria = async (subMateriaId) => {
    try {
        const state = await subMateria.findByIdAndDelete(subMateriaId);
        if (state) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
};
const findGestiones = async () => {
    const gestionesRes = await gestiones.find({});
    return gestionesRes;
};
const crearGestion = async (gestion) => {
    const createGestion = await gestiones.create(gestion);
    return createGestion;
};
const borrarGestion = async (gestionId) => {
    try {
        const state = await gestiones.findByIdAndDelete(gestionId);
        if (state) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
};
const findGestionDetalle = async () => {
    const gestionesDetalleRes = await gestionesDetalle.find({});
    return gestionesDetalleRes;
};
const crearGestionDetalle = async (gestion) => {
    const createGestionDetalle = await gestionesDetalle.create(gestion);
    return createGestionDetalle;
};
const borrarGestionDetalle = async (gestionId) => {
    try {
        const state = await gestionesDetalle.findByIdAndDelete(gestionId);
        if (state) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
};
exports.default = {
    findServicios,
    createServicio,
    borrarServicio,
    findServiciosTipo,
    createServicioTipo,
    borrarTipoServicio,
    findProcedimientos,
    createProcedimeinto,
    borrarProcedimiento,
    findSubMaterias,
    createSubMateria,
    borrarSubMateria,
    findGestiones,
    crearGestion,
    borrarGestion,
    findGestionDetalle,
    crearGestionDetalle,
    borrarGestionDetalle
};
//# sourceMappingURL=servicio.service.js.map