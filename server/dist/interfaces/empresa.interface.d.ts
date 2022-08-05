import { Role } from './roles.interface';
import { User } from './users.interface';
export interface Empresa {
    _id: string;
    nombre: string;
    direccion: string;
    administradores: User[];
    abogados: User[];
    vendedores: User[];
    procuradores: User[];
    roles: Role[];
}
