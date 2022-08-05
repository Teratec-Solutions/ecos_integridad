import { Router } from 'express'
import UsersController from '@controllers/users.controller'
import authMiddleware from '@/middlewares/auth.middleware'

const router = Router()

router.post(`/createUser`, authMiddleware, UsersController.createUser)
router.post(`/editUser`, authMiddleware, UsersController.editUser)
router.post(`/getUserById`, authMiddleware, UsersController.getUserById)
router.post(`/deleteUser`, authMiddleware, UsersController.deleteUser)
router.get(`/getUsers`, authMiddleware, UsersController.getUsers)

export default router
