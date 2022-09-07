import { Orden } from '../interfaces/wo.interface';
declare const _default: {
    getWorkOrders: () => Promise<Orden[]>;
    createWorkOrder: (orden: Orden) => Promise<Orden>;
};
export default _default;
