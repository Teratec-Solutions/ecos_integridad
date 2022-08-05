import { CreateRoleDto } from '../dtos/roles.dto';
declare const superAdmin: CreateRoleDto;
declare const admin: {
    name: string;
    description: string;
};
declare const user: CreateRoleDto;
declare const client: CreateRoleDto;
export { admin, user, superAdmin, client };
