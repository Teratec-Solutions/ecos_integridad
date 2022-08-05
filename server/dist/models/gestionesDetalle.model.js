"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const gestionesDetalleSchema = new mongoose_1.Schema({
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
const gestionesDetalleModel = (0, mongoose_1.model)('GestionDetalle', gestionesDetalleSchema);
exports.default = gestionesDetalleModel;
//# sourceMappingURL=gestionesDetalle.model.js.map