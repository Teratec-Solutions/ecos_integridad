"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const client_controller_1 = (0, tslib_1.__importDefault)(require("../controllers/client.controller"));
const router = (0, express_1.Router)();
router.post(`/createClient`, client_controller_1.default.createClient);
router.post(`/editClient`, client_controller_1.default.editClient);
router.post(`/deleteClient`, client_controller_1.default.deleteClient);
router.post(`/getClientById`, client_controller_1.default.getClientById);
router.get(`/getAllClients`, client_controller_1.default.getAllClients);
/* class ClientRoute implements Routes {
    public path = '/api/clients'
    public router = Router()
    public clientController = new ClientController()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/createClient`, this.clientController.createClient)
        this.router.post(`${this.path}/editClient`, this.clientController.editClient)
        this.router.post(`${this.path}/deleteClient`, this.clientController.deleteClient)
        this.router.post(`${this.path}/getClientById`, this.clientController.getClientById)
        this.router.get(`${this.path}/getAllClients`, this.clientController.getAllClients)
    }

} */
exports.default = router;
//# sourceMappingURL=client.route.js.map