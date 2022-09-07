import { Orden } from '@/interfaces/wo.interface'
import WoService from '@/services/wo.service'
import { locale } from '@configs/env'
import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongoose'


const getWorkOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await WoService.getWorkOrders()
        res.status(201).json({ data: response, message: 'lista de ordenes' })
    } catch (error) {
        next(error)
    }
}

const createWorkOrder = async (req: Request, res: Response, next: NextFunction) => {
    const orden: Orden = req.body
    try {
        const response = await WoService.createWorkOrder(orden)
        res.status(201).json({ data: response, message: 'orden creada' })
    } catch (error) {
        next(error)
    }
}

export default {
    getWorkOrders,
    createWorkOrder
}
