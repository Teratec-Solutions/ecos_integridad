"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const clients_model_1 = (0, tslib_1.__importDefault)(require("../models/clients.model"));
/* import { isEmpty } from "class-validator"; */
class ClientService {
    constructor() {
        this.client = clients_model_1.default;
    }
    async findAllClients() {
        const clients = await this.client.find({ state: true });
        console.log(clients);
        return clients;
    }
    async createClient(clientData) {
        const createClientState = await this.client.create(clientData);
        return createClientState;
    }
    async editClient(clientData) {
        const createClientState = await this.client.findByIdAndUpdate(clientData._id, clientData);
        return createClientState;
    }
    async deleteClient(clientData) {
        const createClientState = await this.client.findByIdAndUpdate(clientData._id, { state: false });
        return createClientState;
    }
    async getClientById(id) {
        const response = await this.client.findOne({ _id: id, state: true });
        return response;
    }
}
exports.default = ClientService;
//# sourceMappingURL=client.service.js.map