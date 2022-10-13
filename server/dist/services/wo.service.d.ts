import { Orden } from '../interfaces/wo.interface';
declare const _default: {
    getWorkOrders: () => Promise<Orden[]>;
    getNumberWorkOrders: () => Promise<number>;
    createWorkOrder: (orden: Orden) => Promise<Orden>;
    editWorkOrder: (orden: Orden) => Promise<Orden>;
    deleteWorkOrder: (_id: string) => Promise<Orden>;
    getWoById: (orderId: string) => Promise<Orden>;
    getWoByUserId: (userId: string) => Promise<Orden[]>;
};
export default _default;
