import { Router } from 'express'
import UsersController from '@controllers/users.controller'
import authMiddleware from '@/middlewares/auth.middleware'

const router = Router()

router.post(`/createClient`, authMiddleware, UsersController.createUser)
router.post(`/editClient`, authMiddleware, UsersController.editUser)
router.post(`/getClientById`, authMiddleware, UsersController.getUserById)
router.post(`/deleteClient`, authMiddleware, UsersController.deleteUser)
router.get(`/getClient`, authMiddleware, UsersController.getUsers)

export default router