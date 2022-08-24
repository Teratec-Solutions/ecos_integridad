import { Cliente } from '../interfaces/clients.interface';
import { User } from '../interfaces/users.interface';
declare const _default: {
    findAllClient: () => Promise<Cliente[]>;
    findClientById: (clientId: string, locale?: string) => Promise<Cliente>;
    editClient: (usuario: Cliente, locale?: string) => Promise<Cliente>;
    createClient: (clientData: Cliente, locale?: string) => Promise<Cliente>;
    updateClient: (clientId: string, clientData: User, locale?: string) => Promise<Cliente>;
    deleteClient: (clientId: string, locale?: string) => Promise<Cliente>;
};
export default _default;
