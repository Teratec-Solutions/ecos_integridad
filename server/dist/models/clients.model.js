"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const clienteSchema = new mongoose_1.Schema({
    nombre: {
        type: mongoose_1.Schema.Types.String,
    },
    apellido1: {
        type: mongoose_1.Schema.Types.String,
        required: false
    },
    apellido2: {
        type: mongoose_1.Schema.Types.String,
        required: false
    },
    email: {
        type: mongoose_1.Schema.Types.String,
    },
    rut: {
        type: mongoose_1.Schema.Types.String,
    },
    telefono: {
        type: mongoose_1.Schema.Types.String,
    },
    celular: {
        type: mongoose_1.Schema.Types.String,
    },
    direccion: {
        type: mongoose_1.Schema.Types.String,
    },
    region: {
        type: mongoose_1.Schema.Types.String,
    },
    ciudad: {
        type: mongoose_1.Schema.Types.String,
    },
    depto: {
        type: mongoose_1.Schema.Types.String,
    },
    origenDeContacto: {
        type: mongoose_1.Schema.Types.String,
    },
    referidoPor: {
        type: mongoose_1.Schema.Types.String,
    },
    profesion: {
        type: mongoose_1.Schema.Types.String,
    },
    nacionalidad: {
        type: mongoose_1.Schema.Types.String,
    },
    estadoCivil: {
        type: mongoose_1.Schema.Types.String,
    },
    detalleOrigenContacto: {
        type: mongoose_1.Schema.Types.String,
    },
    detalleGoogleAds: {
        type: mongoose_1.Schema.Types.String,
    },
    detalleFormaDePAgo: {
        type: mongoose_1.Schema.Types.String,
    },
    detalleMedioDePago: {
        type: mongoose_1.Schema.Types.String,
    },
    googleAds: {
        type: mongoose_1.Schema.Types.String,
    },
    materia: {
        type: mongoose_1.Schema.Types.String,
    },
    state: {
        type: mongoose_1.Schema.Types.Boolean,
        default: true
    },
    descripcion: {
        type: mongoose_1.Schema.Types.String,
    },
    vendedor: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    clienteTipo: {
        type: mongoose_1.Schema.Types.String,
    } /* ,
    empresa: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Organization'
        }
    ] */
}, {
    timestamps: true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});
const clienteModel = (0, mongoose_1.model)('Cliente', clienteSchema);
exports.default = clienteModel;
//# sourceMappingURL=clients.model.js.map