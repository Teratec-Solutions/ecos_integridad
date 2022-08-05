"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const causaSchema = new mongoose_1.Schema({
    nombre: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    creadoPor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        require: false
    },
    observaciones: {
        type: mongoose_1.Schema.Types.String,
        require: false
    },
    cliente: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
    abogado: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    materia: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'ServicioTipo'
    },
    subMateria: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'ServicioTipo'
    },
    procedimiento: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Procedimiento'
    },
    state: {
        type: mongoose_1.Schema.Types.Boolean,
        default: true
    },
    honorarios: {
        type: mongoose_1.Schema.Types.String
    },
    numeroCausa: {
        type: mongoose_1.Schema.Types.String
    },
    formaDePago: {
        type: mongoose_1.Schema.Types.String
    },
    detalleFormaDePago: {
        type: mongoose_1.Schema.Types.String
    },
    medioDePago: {
        type: mongoose_1.Schema.Types.String
    },
    detalleMedioDePago: {
        type: mongoose_1.Schema.Types.String
    },
    rolrit: {
        type: mongoose_1.Schema.Types.String
    },
    corte: {
        type: mongoose_1.Schema.Types.String
    },
    tribunal: {
        type: mongoose_1.Schema.Types.String
    },
    caratula: {
        type: mongoose_1.Schema.Types.String
    },
    closedAt: {
        type: mongoose_1.Schema.Types.Date
    },
    cerradoPor: {
        type: mongoose_1.Schema.Types.ObjectId
    },
    servicios: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Servicio'
        }
    ],
    pagos: {
        type: Object
    },
    gestionesCausa: [
        {
            type: Object
        }
    ],
    gestionesDetallesCausa: [
        {
            type: Object
        }
    ]
}, {
    timestamps: true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    },
    versionKey: false
});
const causaModel = (0, mongoose_1.model)('Causa', causaSchema);
exports.default = causaModel;
//# sourceMappingURL=causa.model.js.map