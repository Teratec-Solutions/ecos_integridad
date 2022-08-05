"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const procedimientoSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: true
    },
    creadoPor: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: false
    },
    description: {
        type: String,
        require: false
    }
}, {
    timestamps: true
});
const procedimientoModel = (0, mongoose_1.model)('Procedimiento', procedimientoSchema);
exports.default = procedimientoModel;
//# sourceMappingURL=procedimiento.model.js.map