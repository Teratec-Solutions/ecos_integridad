import { Contrato } from '@/interfaces/clients.interface'
import contratoService from '@/services/contrato.service'
import { NextFunction, Request, Response } from 'express'

const guardarContrato = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const contrato: Contrato = req.body
    const response = await contratoService.guardarContrato(contrato)
    res.json({data: response, message: 'Contrato Guardado'})
}

export default {
    guardarContrato
}