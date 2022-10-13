import { Template } from '@/interfaces/template.interface'
import { NextFunction, Request, Response } from 'express'
import templatesService from '@/services/templates.service'

const getTemplates = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response: Template[] = await templatesService.getTemplates()
        res.status(201).json({ data: response, message: 'Lista de protocolos enviados' })
    } catch (error) {
        next(error)
    }
}

const createTemplate = async (req: Request, res: Response, next: NextFunction) => {
    const template = req.body as Template
    try {
        const response = await templatesService.createTemplate(template)
        res.status(201).json({ data: response, message: 'Protocolo creado' })
    } catch (error) {
        next(error)
    }
}

const saveTemplate = async (req: Request, res: Response, next: NextFunction) => {
    const template = req.body as Template
    try {
        const response = await templatesService.saveTemplate(template)
        res.status(201).json({ data: response._id, message: 'Protocolo guardado' })
    } catch (error) {
        next(error)
    }
}

const deleteTemplate = async (req: Request, res: Response, next: NextFunction) => {
    const plantillaId = req.body
    console.log('Plantilla ID:', plantillaId)
    try {
        await templatesService.deleteTemplate(plantillaId.plantillaId)
        res.status(201).json({ message: 'Protocolo eliminado' })
    } catch (error) {
        next(error)
    }
}

const getTemplateByContract = async (req: Request, res: Response, next: NextFunction) => {
    const idContract = req.body
    console.log('Plantilla ID:', idContract)
    try {
        const response = await templatesService.getTemplateByContract(idContract)
        res.status(201).json({ data: response, message: 'Protocolo enviado' })
    } catch (error) {
        next(error)
    }
}

export default {
    getTemplates,
    createTemplate,
    saveTemplate,
    deleteTemplate,
    getTemplateByContract
}