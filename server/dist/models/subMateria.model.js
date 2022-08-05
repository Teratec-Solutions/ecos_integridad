"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const subMateriaSchema = new mongoose_1.Schema({
    nombre: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    creadoPor: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: false
    },
    description: {
        type: mongoose_1.Schema.Types.String,
        require: false
    }
}, {
    timestamps: true
});
const subMateriaModel = (0, mongoose_1.model)('SubMateria', subMateriaSchema);
exports.default = subMateriaModel;
//# sourceMappingURL=subMateria.model.js.map