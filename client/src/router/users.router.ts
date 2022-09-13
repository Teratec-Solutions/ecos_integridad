import axios, { AxiosError, AxiosResponse } from 'axios'
import { Usuario } from '../interfaces/Usuario'

const createUser = async (usuario: Usuario): Promise<AxiosResponse|any> => {
    try {
        const response = await axios.post('/api/users/createUser', usuario)
        return response
    } catch (error) {
        return error
    }
}

const editUser = async (usuario: Usuario): Promise<AxiosResponse|any> => {
    try {
        const response = await axios.post('/api/users/editUser', usuario)
        return response
    } catch (error) {
        return error
    }
}

const getUserById = async (_id: {id: string}): Promise<AxiosResponse|any> => {
    try {
        const response = await axios.post('/api/users/getUserById', {id: _id.id})
        return response
    } catch (error) {
        return error
    }
}

export default {
    createUser,
    editUser,
    getUserById
}