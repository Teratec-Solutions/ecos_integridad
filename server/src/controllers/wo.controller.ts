import { Orden } from '@/interfaces/wo.interface'
import WoService from '@/services/wo.service'
import { NextFunction, Request, Response } from 'express'

const getWorkOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await WoService.getWorkOrders()
        res.status(201).json({ data: response, message: 'lista de ordenes' })
    } catch (error) {
        next(error)
    }
}

const getNumberWorkOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const total = await WoService.getNumberWorkOrders()
        res.status(201).json({ data: { total: total }, message: 'total de ordenes' })
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

const editWorkOrder = async (req: Request, res: Response, next: NextFunction) => {
    const orden: Orden = req.body
    try {
        const response = await WoService.editWorkOrder(orden)
        res.status(201).json({ data: response, message: 'orden editada' })
    } catch (error) {
        next(error)
    }
}

const deleteWorkOrder = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body._id)
    try {
        const response = await WoService.deleteWorkOrder(req.body._id)
        res.status(201).json({ message: 'orden elimnada' })
    } catch (error) {
        
    }
}
const getWoById = async (req: Request, res: Response, next: NextFunction) => {
    const ordenId: string = req.body.orderId
    console.log(ordenId)
    try {
        const response = await WoService.getWoById(ordenId)
        res.status(201).json({ data: response, message: 'orden enviada' })
    } catch (error) {
        next(error)
    }
}

const getWoByUserId = async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.body.userId
    console.log(userId)
    try {
        const response = await WoService.getWoByUserId(userId)
        res.status(201).json({ data: response, message: 'ordenes por usuario enviados' })
    } catch (error) {
        next(error)
    }
}

export default {
    getWorkOrders,
    getNumberWorkOrders,
    createWorkOrder,
    editWorkOrder,
    deleteWorkOrder,
    getWoById,
    getWoByUserId
}
