import { Contrato } from '@/interfaces/clients.interface'
import contratoService from '@/services/contrato.service'
import { NextFunction, Request, Response } from 'express'

const guardarContrato = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const contrato: Contrato = req.body
    const response = await contratoService.guardarContrato(contrato)
    res.json({data: response, message: 'Contrato Guardado'})
}

const leerContratosPorCliente = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const response = await contratoService.leerContratosPorCliente(req.body.clienteId)
    res.json({data: response, message: `Contratos por ${req.body.clienteId}`})
}

export default {
    guardarContrato,
    leerContratosPorCliente
}