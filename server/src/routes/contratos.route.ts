import { Router } from 'express'
import authMiddleware from '@/middlewares/auth.middleware'
import ContratoController from '@/controllers/contrato.controller'

const router = Router()

router.post(`/guardarContrato`, authMiddleware, ContratoController.guardarContrato)
router.post(`/leerContratosPorCliente`, authMiddleware, ContratoController.leerContratosPorCliente)

export default router