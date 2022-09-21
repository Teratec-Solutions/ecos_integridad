import { Router } from 'express'
import authMiddleware from '@/middlewares/auth.middleware'
import ContratoController from '@/controllers/contrato.controller'

const router = Router()

router.post(`/guardarContrato`, authMiddleware, ContratoController.guardarContrato)

export default router