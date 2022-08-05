import { Causa } from "../interfaces/causa.interface";
declare const _default: {
    obtenerCausas: () => Promise<Causa[]>;
    obtenerCausasParaContar: () => Promise<Causa[]>;
    obtenerCausasPorAbogado: (_id: any) => Promise<Causa[]>;
    obtenerCausasPorProcurador: (_id: any) => Promise<Causa[]>;
    obtenerCausaPorId: (_id: string) => Promise<Causa>;
    obtenerCausasPorCliente: (_id: any) => Promise<Causa[]>;
    guardarCausa: (causaData: Causa) => Promise<Causa>;
    editarCausa: (causaData: Causa) => Promise<Causa>;
    eliminarCausa: (causaId: string) => Promise<Causa>;
};
export default _default;
