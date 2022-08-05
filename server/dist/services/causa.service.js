"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const causa_model_1 = (0, tslib_1.__importDefault)(require("../models/causa.model"));
const causa = causa_model_1.default;
const obtenerCausas = async () => {
    try {
        const response = await causa.find({ state: true });
        console.log('Causas: ', response);
        return response;
    }
    catch (error) {
    }
};
const obtenerCausasParaContar = async () => {
    try {
        const response = await causa.find();
        return response;
    }
    catch (error) {
    }
};
const obtenerCausasPorAbogado = async (_id) => {
    try {
        const response = await causa.find({ state: true, abogado: _id });
        console.log(response);
        return response;
    }
    catch (error) {
    }
};
const obtenerCausasPorProcurador = async (_id) => {
    try {
        const response = await causa.find({ state: true, gestionesCausa: { $elemMatch: { procuradores: [_id._id] } } });
        console.log(response);
        return response;
    }
    catch (error) {
    }
};
const obtenerCausaPorId = async (_id) => {
    try {
        const response = await causa.findById(_id);
        return response;
    }
    catch (error) {
    }
};
const obtenerCausasPorCliente = async (_id) => {
    try {
        const response = await causa.find({ state: true, cliente: _id });
        return response;
    }
    catch (error) {
    }
};
const guardarCausa = async (causaData) => {
    try {
        console.log('Causa: ', causaData);
        const response = await causa.create(causaData);
        return response;
    }
    catch (error) {
        console.log(error);
    }
};
const editarCausa = async (causaData) => {
    try {
        console.log('Causa: ', causaData);
        const response = await causa.findByIdAndUpdate(causaData._id, causaData);
        return response;
    }
    catch (error) {
        console.log(error);
    }
};
/* const editarGestionCausa = async (causaData: Causa): Promise<Causa> => {
    try {
        console.log('Causa: ',causaData)
        const causa: Causa = await causa.findById(causaData._id)
        const gestiones: GestionCausa[] = causa.gestionesCausa
        gestiones.push(causaData.gestionesCausa)
        return response
    } catch (error) {
        console.log(error)
    }
}*/
const borrarCausa = async (causaId) => {
    try {
        const response = await causa.findByIdAndDelete(causaId);
        return response;
    }
    catch (error) {
        console.log(error);
    }
};
const eliminarCausa = async (causaId) => {
    try {
        const response = await causa.findByIdAndUpdate(causaId, { state: false });
        return response;
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = {
    obtenerCausas,
    obtenerCausasParaContar,
    obtenerCausasPorAbogado,
    obtenerCausasPorProcurador,
    obtenerCausaPorId,
    obtenerCausasPorCliente,
    guardarCausa,
    editarCausa,
    /* editarGestionCausa, */
    eliminarCausa
};
//# sourceMappingURL=causa.service.js.map