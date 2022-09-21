import { Router } from 'express'
import AuthRouter from './auth.route'
import UsersRouter from './users.route'
import ClientsRouter from './clients.route'
import WoRouter from './wo.route'
import ContratosRouter from './contratos.route'

const router = Router()

router.use('/api', AuthRouter)
router.use('/api/users', UsersRouter)
router.use('/api/clients', ClientsRouter)
router.use('/api/orders', WoRouter)
router.use('/api/contratos', ContratosRouter)

export default router
