import { Document } from 'mongoose';
import { Contrato } from '../interfaces/clients.interface';
declare const contratoModel: import("mongoose").Model<Contrato & Document<any, any, any>, {}, {}>;
export default contratoModel;
