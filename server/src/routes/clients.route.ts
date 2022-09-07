import { Router } from 'express'
import ClientsController from '@/controllers/clients.controller'
import authMiddleware from '@/middlewares/auth.middleware'

const router = Router()

router.post(`/createClient`, authMiddleware, ClientsController.createClient)
router.post(`/editClient`, authMiddleware, ClientsController.editClient)
router.post(`/getClientById`, authMiddleware, ClientsController.getClientById)
router.post(`/deleteClient`, authMiddleware, ClientsController.deleteClient)
router.get(`/getClients`, authMiddleware, ClientsController.getClients)

export default router