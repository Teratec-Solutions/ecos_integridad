"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const organizationSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});
const organizationModel = (0, mongoose_1.model)('Organization', organizationSchema);
exports.default = organizationModel;
//# sourceMappingURL=organizations.model.js.map