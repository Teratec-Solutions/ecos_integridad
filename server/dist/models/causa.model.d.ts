import { Causa } from '../interfaces/causa.interface';
import { Document } from 'mongoose';
declare const causaModel: import("mongoose").Model<Causa & Document<any, any, any>, {}, {}>;
export default causaModel;
