"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const env_1 = require("../configs/env");
const clients_service_1 = (0, tslib_1.__importDefault)(require("../services/clients.service"));
const getClients = async (req, res, next) => {
    try {
        const findAllClientsData = await clients_service_1.default.findAllClient();
        res.status(200).json({ data: findAllClientsData, message: 'findAll' });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
const getClientById = async (req, res, next) => {
    try {
        const clientId = req.body.id;
        const clientLocale = req.cookies.language || env_1.locale;
        const findOneClientData = await clients_service_1.default.findClientById(clientId, clientLocale);
        res.status(200).json({ data: findOneClientData, message: 'findOne' });
    }
    catch (error) {
        next(error);
    }
};
const createClient = async (req, res, next) => {
    try {
        const clientData = req.body;
        const clientLocale = req.cookies.language || env_1.locale;
        const createClientData = await clients_service_1.default.createClient(clientData, clientLocale);
        res.status(201).json({ data: createClientData, message: 'created' });
    }
    catch (error) {
        next(error);
    }
};
const editClient = async (req, res, next) => {
    try {
        const clientData = req.body;
        console.log(clientData);
        const updateClientData = await clients_service_1.default.editClient(clientData);
        console.log(updateClientData);
        res.status(200).json({ data: updateClientData, message: 'updated' });
    }
    catch (error) {
        next(error);
    }
};
const deleteClient = async (req, res, next) => {
    try {
        const clientId = req.params.id;
        const clientLocale = req.cookies.language || env_1.locale;
        const deleteClientData = await clients_service_1.default.deleteClient(clientId, clientLocale);
        res.status(200).json({ data: deleteClientData, message: 'deleted' });
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    getClients,
    getClientById,
    createClient,
    editClient,
    deleteClient
};
//# sourceMappingURL=clients.controller.js.map