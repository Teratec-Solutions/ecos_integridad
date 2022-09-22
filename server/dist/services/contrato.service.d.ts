/// <reference types="mongoose" />
import { Contrato } from "../interfaces/clients.interface";
declare const _default: {
    guardarContrato: (contrato: Contrato) => Promise<Contrato & import("mongoose").Document<any, any, any>>;
};
export default _default;
