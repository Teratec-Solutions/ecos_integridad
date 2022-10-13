import { Router } from 'express'
import TemplateController from '@/controllers/template.controller'
import authMiddleware from '@/middlewares/auth.middleware'

const router = Router()

router.get(`/getTemplates`, authMiddleware, TemplateController.getTemplates)
router.post(`/createTemplate`, authMiddleware, TemplateController.createTemplate)
router.post(`/saveTemplate`, authMiddleware, TemplateController.saveTemplate)
router.post(`/deleteTemplate`, authMiddleware, TemplateController.deleteTemplate)
router.post(`/getTemplateByContract`, authMiddleware, TemplateController.getTemplateByContract)

export default router