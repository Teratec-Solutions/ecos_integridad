import { ServicioTipo } from '../interfaces/servicioTipo.interface';
import { Document } from 'mongoose';
declare const gestionesModel: import("mongoose").Model<ServicioTipo & Document<any, any, any>, {}, {}>;
export default gestionesModel;
