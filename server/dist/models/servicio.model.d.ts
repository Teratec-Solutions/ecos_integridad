import { Servicio } from '../interfaces/servicio.interface';
import { Document } from 'mongoose';
declare const servicioModel: import("mongoose").Model<Servicio & Document<any, any, any>, {}, {}>;
export default servicioModel;
