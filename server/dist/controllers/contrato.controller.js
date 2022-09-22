"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const contrato_service_1 = (0, tslib_1.__importDefault)(require("../services/contrato.service"));
const guardarContrato = async (req, res, next) => {
    console.log(req.body);
    const contrato = req.body;
    const response = await contrato_service_1.default.guardarContrato(contrato);
    res.json({ data: response, message: 'Contrato Guardado' });
};
const leerContratosPorCliente = async (req, res, next) => {
    console.log(req.body);
    const response = await contrato_service_1.default.leerContratosPorCliente(req.body.clienteId);
    res.json({ data: response, message: `Contratos por ${req.body.clienteId}` });
};
exports.default = {
    guardarContrato,
    leerContratosPorCliente
};
//# sourceMappingURL=contrato.controller.js.map