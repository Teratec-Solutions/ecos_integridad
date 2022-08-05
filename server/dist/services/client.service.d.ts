/// <reference types="mongoose" />
import { Cliente } from "../interfaces/cliente.interface";
declare class ClientService {
    client: import("mongoose").Model<Cliente & import("mongoose").Document<any, any, any>, {}, {}>;
    findAllClients(): Promise<any[]>;
    createClient(clientData: Cliente): Promise<Cliente>;
    editClient(clientData: Cliente): Promise<Cliente>;
    deleteClient(clientData: Cliente): Promise<Cliente>;
    getClientById(id: string): Promise<Cliente>;
}
export default ClientService;
