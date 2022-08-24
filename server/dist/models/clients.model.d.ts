import { Document } from 'mongoose';
import { Cliente } from '../interfaces/clients.interface';
declare const clientModel: import("mongoose").Model<Cliente & Document<any, any, any>, {}, {}>;
export default clientModel;
