"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const servicioTipoSchema = new mongoose_1.Schema({
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
const servicioTipoModel = (0, mongoose_1.model)('ServicioTipo', servicioTipoSchema);
exports.default = servicioTipoModel;
//# sourceMappingURL=servicioTipo.model.js.map