import { Router } from 'express'
import WoController from '@/controllers/wo.controller'
import authMiddleware from '@/middlewares/auth.middleware'

const router = Router()

router.post(`/saveOrder`, authMiddleware, WoController.createWorkOrder)
router.post(`/editOrder`, authMiddleware, WoController.createWorkOrder)
router.get(`/getWorkOrders`, authMiddleware, WoController.getWorkOrders)
router.get(`/getNumberWorkOrders`, authMiddleware, WoController.getNumberWorkOrders)
router.post(`/deleteWorkOrder`, authMiddleware, WoController.deleteWorkOrder)

export default router