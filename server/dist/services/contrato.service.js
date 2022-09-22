"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const clients_model_1 = (0, tslib_1.__importDefault)(require("../models/clients.model"));
const contrato_model_1 = (0, tslib_1.__importDefault)(require("../models/contrato.model"));
const contract = contrato_model_1.default;
const client = clients_model_1.default;
const guardarContrato = async (contrato) => {
    try {
        const response = await contract.create(Object.assign({}, contrato));
        const responseClient = await client.findById(contrato.cliente);
        responseClient.contratos.push(response._id);
        await client.findByIdAndUpdate(responseClient._id, responseClient);
        return response;
    }
    catch (error) {
    }
};
const leerContratosPorCliente = async (clienteId) => {
    console.log('Cliente ID:', clienteId);
    try {
        const response = await contract.find({ cliente: clienteId });
        return response;
    }
    catch (error) {
    }
};
exports.default = {
    guardarContrato,
    leerContratosPorCliente
};
//# sourceMappingURL=contrato.service.js.map