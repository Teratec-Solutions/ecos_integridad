import { Router } from 'express'
import WoController from '@/controllers/wo.controller'
import authMiddleware from '@/middlewares/auth.middleware'

const router = Router()

router.post(`/createWorkOrder`, authMiddleware, WoController.createWorkOrder)
router.get(`/getWorkOrders`, authMiddleware, WoController.getWorkOrders)

export default router