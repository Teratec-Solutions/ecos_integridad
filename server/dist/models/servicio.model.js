"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const servicioSchema = new mongoose_1.Schema({
    nombre: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    fechaSolicitud: {
        type: mongoose_1.Schema.Types.Date
    },
    fechaMeta: {
        type: mongoose_1.Schema.Types.Date
    },
    fechaAlerta: {
        type: mongoose_1.Schema.Types.Date
    },
    procurador: {
        type: mongoose_1.Schema.Types.ObjectId
    },
    fechaReal: {
        type: mongoose_1.Schema.Types.Date
    },
    costo: {
        type: mongoose_1.Schema.Types.String
    },
    medioDePago: {
        type: mongoose_1.Schema.Types.String
    },
    tipo: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    creadoPor: {
        type: mongoose_1.Schema.Types.String,
    },
    description: {
        type: mongoose_1.Schema.Types.String,
        require: false
    }
}, {
    timestamps: true
});
const servicioModel = (0, mongoose_1.model)('Servicio', servicioSchema);
exports.default = servicioModel;
//# sourceMappingURL=servicio.model.js.map