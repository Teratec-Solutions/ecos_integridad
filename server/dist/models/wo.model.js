"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const woSchema = new mongoose_1.Schema({
    asignado: [
        {
            type: Object
        }
    ],
    fechaInicio: {
        type: Date
    },
    fechaTermino: {
        type: Date
    },
    tareas: [
        {
            type: Object
        }
    ],
    cliente: [
        {
            type: Object
        }
    ],
    deleted: {
        type: Boolean,
        required: false
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