import { env } from '@/configs'
import { Orden } from '@/interfaces/wo.interface'
import woModel from '@/models/wo.model'
import { HttpException } from '@exceptions/HttpException'
import { isEmpty } from '@utils/util'
import bcrypt from 'bcrypt'
import { __ } from 'i18n'

const workOrder = woModel

const getWorkOrders = async () => {
    const ordenes: Orden[] = await workOrder.find()
    return ordenes
}

const createWorkOrder = async (orden: Orden) => {
    const wo: Orden = await workOrder.create({...orden})
    return wo
}

export default {
    getWorkOrders,
    createWorkOrder
}