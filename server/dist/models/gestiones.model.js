"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const gestionesSchema = new mongoose_1.Schema({
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
const gestionesModel = (0, mongoose_1.model)('Gestion', gestionesSchema);
exports.default = gestionesModel;
//# sourceMappingURL=gestiones.model.js.map