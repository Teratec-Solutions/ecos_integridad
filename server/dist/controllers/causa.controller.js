"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const causa_service_1 = (0, tslib_1.__importDefault)(require("../services/causa.service"));
const guardarCausa = async (req, res, next) => {
    const causa = req.body.causaData;
    try {
        const causas = await causa_service_1.default.obtenerCausasParaContar();
        causa.numeroCausa = causas.length.toString();
        console.log('Causa-datos: ', causa);
        const response = await causa_service_1.default.guardarCausa(causa);
        res.status(201).json({ data: response, message: 'causa creada' });
    }
    catch (error) {
    }
};
const editarCausa = async (req, res, next) => {
    const causa = req.body.causaData;
    try {
        console.log('Causa-datos: ', causa);
        const response = await causa_service_1.default.editarCausa(causa);
        res.status(201).json({ data: response, message: 'causa editada' });
    }
    catch (error) {
    }
};
const borrarCausa = async (req, res, next) => {
    const causaId = req.body.causaId;
    try {
        const response = await causa_service_1.default.eliminarCausa(causaId);
        res.status(201).json({ data: response, message: 'causa creada' });
    }
    catch (error) {
    }
};
const eliminarCausa = async (req, res, next) => {
    const causaId = req.body.causaId;
    try {
        const response = await causa_service_1.default.eliminarCausa(causaId);
        res.status(201).json({ data: response, message: 'causa eliminada' });
    }
    catch (error) {
    }
};
const obtenerCausas = async (req, res, next) => {
    console.log('Leyendo causas');
    try {
        const response = await causa_service_1.default.obtenerCausas();
        res.status(201).json({ data: response, message: 'causa creada' });
    }
    catch (error) {
    }
};
const obtenerTodasLasCausas = async (req, res, next) => {
    try {
        const response = await causa_service_1.default.obtenerCausasParaContar();
        res.status(201).json({ data: response, message: 'causa creada' });
    }
    catch (error) {
    }
};
const obtenerCausasPorAbogado = async (req, res, next) => {
    console.log(req.body);
    try {
        const response = await causa_service_1.default.obtenerCausasPorAbogado(req.body);
        res.status(201).json({ data: response, message: 'causa creada' });
    }
    catch (error) {
    }
};
const obtenerCausasPorProcurador = async (req, res, next) => {
    console.log(req.body);
    try {
        const response = await causa_service_1.default.obtenerCausasPorProcurador(req.body);
        res.status(201).json({ data: response, message: 'causa creada' });
    }
    catch (error) {
    }
};
const obtenerCausaPorId = async (req, res, next) => {
    console.log(req.body);
    const { _id } = req.body;
    try {
        const response = await causa_service_1.default.obtenerCausaPorId(_id);
        res.status(201).json({ data: response, message: 'causa obtenida' });
    }
    catch (error) {
    }
};
const obtenerCausasPorCliente = async (req, res, next) => {
    try {
        const response = await causa_service_1.default.obtenerCausasPorCliente(req.body);
        res.status(201).json({ data: response, message: 'causa creada' });
    }
    catch (error) {
    }
};
exports.default = {
    guardarCausa,
    obtenerCausas,
    editarCausa,
    obtenerTodasLasCausas,
    eliminarCausa,
    obtenerCausasPorAbogado,
    obtenerCausasPorProcurador,
    obtenerCausaPorId,
    obtenerCausasPorCliente
};
//# sourceMappingURL=causa.controller.js.map