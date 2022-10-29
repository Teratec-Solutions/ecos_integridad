import axios, { AxiosResponse } from 'axios'
import { Cliente } from '../interfaces/Cliente'

const createClient = async (cliente: Cliente): Promise<AxiosResponse|any> => {
    try {
        const response: AxiosResponse = await axios.post('/api/clients/createClient', cliente)
        return response
    } catch (error: any) {
        return error
    }
}

const editClient = async (cliente: Cliente): Promise<AxiosResponse|any> => {
    try {
        const response: AxiosResponse = await axios.post('/api/clients/editClient', cliente)
        return response
    } catch (error: any) {
        return error
    }
}

const deleteClient = async (_id: string): Promise<AxiosResponse|any> => {
    try {
        const response: AxiosResponse = await axios.post('/api/clients/deleteClient', {_id: _id})
        return response
    } catch (error: any) {
        return error
    }
}

const getClients = async (): Promise<AxiosResponse|any>=> {
    try {
        const response: AxiosResponse = await axios.get('/api/clients/getClients', { withCredentials: true })
        return response
    } catch (error) {
        return error        
    }
}

const getClientById = async (id: string): Promise<AxiosResponse|any>=> {
    try {
        const response: AxiosResponse = await axios.post('/api/clients/getClientById', {id: id}, { withCredentials: true })
        return response
    } catch (error) {
        return error        
    }
}

export default {
    createClient,
    editClient,
    deleteClient,
    getClients,
    getClientById
}