import { ServicioTipo } from '../interfaces/servicioTipo.interface';
import { Document } from 'mongoose';
declare const gestionesDetalleModel: import("mongoose").Model<ServicioTipo & Document<any, any, any>, {}, {}>;
export default gestionesDetalleModel;
