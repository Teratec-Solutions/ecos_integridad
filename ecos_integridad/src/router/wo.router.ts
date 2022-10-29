import axios, { AxiosResponse } from 'axios'
import { Ordenes } from '../interfaces/Ordenes'

const saveOrder = async (orden: Ordenes): Promise<AxiosResponse|any> => {
    try {
        const response : AxiosResponse = await axios.post('api/orders/saveOrder', orden)
        return response
    } catch (error) {
        return error
    }
}

const editOrder = async (orden: Ordenes): Promise<AxiosResponse|any> => {
    try {
        const response : AxiosResponse = await axios.post('api/orders/editOrder', orden)
        return response
    } catch (error) {
        return error
    }
}

const getWoList = async (): Promise<AxiosResponse|any> => {
    try {
        const response : AxiosResponse = await axios.get('api/orders/getWorkOrders')
        return response
    } catch (error) {
        return error
    }
}

const deleteOrder = async (_id: string): Promise<AxiosResponse|any> => {
    try {
        const response : AxiosResponse = await axios.post('api/orders/deleteWorkOrder', {_id:_id})
        return response
    } catch (error) {
        return error
    }
}

const getNumberWorkOrders = async (): Promise<AxiosResponse|any> => {
    try {
        const response : AxiosResponse = await axios.get('api/orders/getNumberWorkOrders')
        return response
    } catch (error) {
        return error
    }
}

const getWoById = async (orderId: string): Promise<AxiosResponse|any> => {
    try {
        const response : AxiosResponse = await axios.post('api/orders/getWoById', {orderId: orderId})
        return response
    } catch (error) {
        return error
    }
}

const getWoByUserId = async (userId: string | undefined): Promise<AxiosResponse|any> => {
    try {
        const response : AxiosResponse = await axios.post('api/orders/getWoByUserId', {userId: userId})
        return response
    } catch (error) {
        return error
    }
}

export default {
    saveOrder,
    editOrder,
    getWoList,
    getNumberWorkOrders,
    deleteOrder,
    getWoById,
    getWoByUserId
}