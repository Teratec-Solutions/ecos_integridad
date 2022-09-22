"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const contratoSchema = new mongoose_1.Schema({
    tipoContrato: {
        type: String,
        required: [true, 'Se requiere un tipo de contrato']
    },
    descripcion: {
        type: String,
        required: [true, 'Se requiere una descripción']
    },
    fechaInicio: {
        type: Date,
        required: false
    },
    fechaTermino: {
        type: Date,
        required: false
    },
    supervisores: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            required: false
        }
    ],
    operarios: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            required: false
        }
    ],
    cliente: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Cliente'
    }
}, {
    timestamps: true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});
const contratoModel = (0, mongoose_1.model)('Contrato', contratoSchema);
exports.default = contratoModel;
//# sourceMappingURL=contrato.model.js.map