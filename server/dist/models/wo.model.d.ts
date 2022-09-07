import { Document } from 'mongoose';
import { Orden } from '../interfaces/wo.interface';
declare const woModel: import("mongoose").Model<Orden & Document<any, any, any>, {}, {}>;
export default woModel;
