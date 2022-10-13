"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const wo_model_1 = (0, tslib_1.__importDefault)(require("../models/wo.model"));
const workOrder = wo_model_1.default;
const getWorkOrders = async () => {
    const ordenes = await workOrder.find().populate('asignado').populate('supervisor').populate('cliente').populate('protocolo');
    return ordenes;
};
const getNumberWorkOrders = async () => {
    const ordenes = await workOrder.find();
    return ordenes.length;
};
const createWorkOrder = async (orden) => {
    const nroOt = await getNumberWorkOrders();
    orden.nroWo = nroOt + 1;
    const wo = await workOrder.create(Object.assign({}, orden));
    return wo;
};
const editWorkOrder = async (orden) => {
    console.log(orden);
    const wo = await workOrder.findByIdAndUpdate(orden._id, orden);
    return wo;
};
const deleteWorkOrder = async (_id) => {
    const wo = await workOrder.findByIdAndDelete(_id);
    return wo;
};
const getWoById = async (orderId) => {
    const wo = await workOrder.findById(orderId).populate('asignado').populate('supervisor').populate('cliente').populate('protocolo');
    return wo;
};
const getWoByUserId = async (userId) => {
    const wo = await workOrder.find({ asignado: { "$all": [userId] } }).populate('asignado').populate('supervisor').populate('cliente').populate('protocolo');
    return wo;
};
exports.default = {
    getWorkOrders,
    getNumberWorkOrders,
    createWorkOrder,
    editWorkOrder,
    deleteWorkOrder,
    getWoById,
    getWoByUserId
};
//# sourceMappingURL=wo.service.js.map