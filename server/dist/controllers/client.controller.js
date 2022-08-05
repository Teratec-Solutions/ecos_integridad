"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const client_service_1 = (0, tslib_1.__importDefault)(require("../services/client.service"));
const clientService = new client_service_1.default();
const getAllClients = async (req, res, next) => {
    console.log('Leyendo clientes');
    try {
        const findAllClients = await clientService.findAllClients();
        res.status(200).json({ data: findAllClients, message: 'find all clients' });
    }
    catch (error) {
        next(error);
    }
};
const createClient = async (req, res, next) => {
    try {
        const client = req.body;
        const newClient = await clientService.createClient(client);
        /* console.log(newClient) */
        res.status(201).json({ data: newClient, message: 'client created' });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
const editClient = async (req, res, next) => {
    try {
        const client = req.body;
        await clientService.editClient(client);
        res.status(201).json({ message: 'cliente editado' });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
const deleteClient = async (req, res, next) => {
    try {
        const client = req.body;
        await clientService.deleteClient(client);
        res.status(201).json({ message: 'cliente eliminado' });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
const getClientById = async (req, res, next) => {
    try {
        const { _id } = req.body;
        console.log('Data!!!!', _id);
        const client = await clientService.getClientById(_id);
        res.status(201).json({ data: client, message: 'client founded' });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.default = {
    getAllClients,
    createClient,
    editClient,
    deleteClient,
    getClientById
};
/* class ClientController {
    public clientService = new ClientService()

    public getAllClients = async (req: Request, res: Response, next: NextFunction) => {
        console.log('Leyendo clientes')
        try {
            const findAllClients: Cliente[] = await this.clientService.findAllClients()
            res.status(200).json({ data: findAllClients, message: 'find all clients' })
        } catch (error) {
            next(error)
        }
    }

    public createClient = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const client: Cliente = req.body
            const newClient = await this.clientService.createClient(client)
            res.status(201).json({ data: newClient, message: 'client created' })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    public editClient = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const client: Cliente = req.body
            await this.clientService.editClient(client)
            res.status(201).json({ message: 'cliente editado' })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    public deleteClient = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const client: Cliente = req.body
            await this.clientService.deleteClient(client)
            res.status(201).json({ message: 'cliente eliminado' })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    public getClientById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {_id}  = req.body
            console.log('Data!!!!', _id)
            const client: Cliente = await this.clientService.getClientById(_id)
            res.status(201).json({ data: client, message: 'client founded' })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

export default ClientController */
//# sourceMappingURL=client.controller.js.map