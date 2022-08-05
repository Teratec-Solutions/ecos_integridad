import { Router } from 'express'
import AuthRouter from './auth.route'
import UsersRouter from './users.route'

const router = Router()

router.use('/api', AuthRouter)
router.use('/api/users', UsersRouter)

export default router
