"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const clientSchema = new mongoose_1.Schema({
    empresa: {
        type: Object,
        required: [true, 'Name is required']
    },
    habilitado: {
        type: Boolean,
        required: false
    },
    contratos: [
        {
            type: Object,
            required: false
        }
    ],
    contactos: [
        {
            type: Object,
            required: false
        }
    ]
}, {
    timestamps: true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});
const clientModel = (0, mongoose_1.model)('Cliente', clientSchema);
exports.default = clientModel;
//# sourceMappingURL=clients.model.js.map