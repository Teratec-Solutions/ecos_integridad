"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const woSchema = new mongoose_1.Schema({
    asignado: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    supervisor: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    prioridad: {
        type: mongoose_1.Schema.Types.String
    },
    createdBy: {
        type: mongoose_1.Schema.Types.String
    },
    descripcion: {
        type: mongoose_1.Schema.Types.String
    },
    fechaInicio: {
        type: Date
    },
    fechaTermino: {
        type: Date
    },
    tareas: [
        {
            type: Object,
        }
    ],
    cliente: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Cliente'
        }
    ],
    contrato: [
        {
            type: Object,
        }
    ],
    deleted: {
        type: Boolean,
        required: false
    },
    nroWo: {
        type: Number
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
const woModel = (0, mongoose_1.model)('WorkOrder', woSchema);
exports.default = woModel;
//# sourceMappingURL=wo.model.js.map