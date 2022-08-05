import { Document } from 'mongoose';
import { Cliente } from '../interfaces/cliente.interface';
declare const clienteModel: import("mongoose").Model<Cliente & Document<any, any, any>, {}, {}>;
export default clienteModel;
