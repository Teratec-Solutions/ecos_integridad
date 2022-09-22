"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const configs_1 = require("../configs");
const clients_model_1 = (0, tslib_1.__importDefault)(require("../models/clients.model"));
const HttpException_1 = require("../exceptions/HttpException");
const util_1 = require("../utils/util");
const bcrypt_1 = (0, tslib_1.__importDefault)(require("bcrypt"));
const i18n_1 = require("i18n");
const client = clients_model_1.default;
const findAllClient = async () => {
    const clients = await client.find().populate('contratos');
    console.log(clients);
    return clients;
};
const findClientById = async (clientId, locale = configs_1.env.locale) => {
    if ((0, util_1.isEmpty)(clientId))
        throw new HttpException_1.HttpException(400, (0, i18n_1.__)({ phrase: 'An ID is required', locale }));
    const findClient = await client.findOne({ _id: clientId }, '-password').populate('contratos');
    if (!findClient)
        throw new HttpException_1.HttpException(404, (0, i18n_1.__)({ phrase: 'User not found', locale }));
    return findClient;
};
const editClient = async (usuario, locale = configs_1.env.locale) => {
    if ((0, util_1.isEmpty)(client))
        throw new HttpException_1.HttpException(400, (0, i18n_1.__)({ phrase: 'Datos de cliente no encontrados', locale }));
    const findClient = await client.findByIdAndUpdate(usuario._id, usuario);
    if (!findClient)
        throw new HttpException_1.HttpException(404, (0, i18n_1.__)({ phrase: 'Client not found', locale }));
    return findClient;
};
/* const findClientsByRole = (role: string) => {
    return new Promise<User[]>( async resolve => {
        if (isEmpty(role)) throw new HttpException(400, __({ phrase: 'An ROLE is required' }))
        const findClients: Cliente[] = await client.find({ role: role })
        console.log(findClients)
        if (!findClients) throw new HttpException(404, __({ phrase: 'Users not found' }))
        resolve(findClients)
    })
} */
const createClient = async (clientData, locale = configs_1.env.locale) => {
    if ((0, util_1.isEmpty)(clientData))
        throw new HttpException_1.HttpException(400, (0, i18n_1.__)({ phrase: 'Credentials are required', locale }));
    /* const findClient: Cliente = await client.findOne({ email: clientData.email }, '-password') // .select('-password')
    if (findClient)
        throw new HttpException(
            409,
            __({ phrase: 'Email {{email}} already exists', locale }, { email: clientData.email })
        )

    const hashedPassword = await bcrypt.hash(clientData.password, 10) */
    const createClientData = await client.create(Object.assign({}, clientData));
    return createClientData;
};
const updateClient = async (clientId, clientData, locale = configs_1.env.locale) => {
    if ((0, util_1.isEmpty)(clientId))
        throw new HttpException_1.HttpException(400, (0, i18n_1.__)({ phrase: 'An ID is required', locale }));
    if ((0, util_1.isEmpty)(clientData))
        throw new HttpException_1.HttpException(400, (0, i18n_1.__)({ phrase: 'User data is required', locale }));
    if (clientData.email) {
        const findUser = await client.findOne({ email: clientData.email });
        if (findUser && findUser._id.toString() !== clientId)
            throw new HttpException_1.HttpException(409, (0, i18n_1.__)({ phrase: 'Email {{email}} already exists', locale }, { email: clientData.email }));
    }
    if (clientData.password) {
        const hashedPassword = await bcrypt_1.default.hash(clientData.password, 10);
        clientData = Object.assign(Object.assign({}, clientData), { password: hashedPassword });
    }
    const updateClientById = await client.findByIdAndUpdate(clientId, { clientData });
    if (!updateClientById)
        throw new HttpException_1.HttpException(409, (0, i18n_1.__)({ phrase: 'User not found', locale }));
    return updateClientById;
};
const deleteClient = async (clientId, locale = configs_1.env.locale) => {
    if ((0, util_1.isEmpty)(clientId))
        throw new HttpException_1.HttpException(400, (0, i18n_1.__)({ phrase: 'An ID is required', locale }));
    const deleteClientById = await client.findByIdAndDelete(clientId);
    if (!deleteClientById)
        throw new HttpException_1.HttpException(404, (0, i18n_1.__)({ phrase: 'User not found', locale }));
    return deleteClientById;
};
exports.default = {
    findAllClient,
    findClientById,
    editClient,
    /* findClientsByRole, */
    createClient,
    updateClient,
    deleteClient
};
//# sourceMappingURL=clients.service.js.map