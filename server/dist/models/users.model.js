"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'Name is required']
    },
    apellido1: {
        type: String,
        required: false
    },
    apellido2: {
        type: String,
        required: false
    },
    fono: {
        type: String
    },
    direccion: {
        type: String
    },
    region: {
        type: String
    },
    ciudad: {
        type: String
    },
    comuna: {
        type: String
    },
    depto: {
        type: String
    },
    profesion: {
        type: String
    },
    nacionalidad: {
        type: String
    },
    estadoCivil: {
        type: String
    },
    sueldoBase: {
        type: String
    },
    comision: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    run: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    emailVerifiedAt: {
        type: Date,
        default: null,
        required: false
    },
    fechaTitulacion: {
        type: String,
        required: false
    },
    estado: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        required: false
    },
    subRoles: [
        {
            type: mongoose_1.Schema.Types.String,
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
const userModel = (0, mongoose_1.model)('User', userSchema);
exports.default = userModel;
//# sourceMappingURL=users.model.js.map