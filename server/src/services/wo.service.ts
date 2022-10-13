import { env } from '@/configs'
import { Orden } from '@/interfaces/wo.interface'
import woModel from '@/models/wo.model'
import { HttpException } from '@exceptions/HttpException'
import { isEmpty } from '@utils/util'
import bcrypt from 'bcrypt'
import { __ } from 'i18n'
import { ObjectId } from 'mongoose'

const workOrder = woModel

const getWorkOrders = async () => {
    const ordenes: Orden[] = await workOrder.find().populate('asignado').populate('supervisor').populate('cliente').populate('protocolo')
    return ordenes
}

const getNumberWorkOrders = async () => {
    const ordenes: Orden[] = await workOrder.find()
    return ordenes.length
}

const createWorkOrder = async (orden: Orden) => {
    const nroOt = await getNumberWorkOrders()
    orden.nroWo = nroOt + 1
    const wo: Orden = await workOrder.create({...orden})
    return wo
}

const editWorkOrder = async (orden: Orden) => {
    console.log(orden)
    const wo: Orden = await workOrder.findByIdAndUpdate(orden._id , orden)
    return wo
}

const deleteWorkOrder = async (_id: string) => {
    const wo: Orden = await workOrder.findByIdAndDelete(_id)
    return wo
}

const getWoById = async (orderId: string) => {
    const wo: Orden = await workOrder.findById(orderId).populate('asignado').populate('supervisor').populate('cliente').populate('protocolo')
    return wo
}

const getWoByUserId = async (userId: string) => {
    const wo: Orden[] = await workOrder.find({asignado: {"$all" : [userId]}}).populate('asignado').populate('supervisor').populate('cliente').populate('protocolo')
    return wo
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