"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const causa_controller_1 = (0, tslib_1.__importDefault)(require("../controllers/causa.controller"));
const router = (0, express_1.Router)();
router.post(`/guardarCausa`, causa_controller_1.default.guardarCausa);
router.post(`/editarCausa`, causa_controller_1.default.editarCausa);
router.post(`/eliminarCausa`, causa_controller_1.default.eliminarCausa);
router.get(`/obtenerCausas`, causa_controller_1.default.obtenerCausas);
router.get(`/obtenerTodasLasCausas`, causa_controller_1.default.obtenerTodasLasCausas);
router.post(`/obtenerCausasPorAbogado`, causa_controller_1.default.obtenerCausasPorAbogado);
router.post(`/obtenerCausasPorProcurador`, causa_controller_1.default.obtenerCausasPorProcurador);
router.post(`/obtenerCausaPorId`, causa_controller_1.default.obtenerCausaPorId);
router.post(`/obtenerCausasPorCliente`, causa_controller_1.default.obtenerCausasPorCliente);
exports.default = router;
//# sourceMappingURL=causas.route.js.map