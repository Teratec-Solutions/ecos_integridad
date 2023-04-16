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

const deleteUser = async (userId: string): Promise<AxiosResponse|any> => {
    try {
        const response = await axios.post('/api/users/deleteUser', {id: userId})
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

const getUsers = async (): Promise<AxiosResponse|any> => {
    try {
        const response = await axios.get('/api/users/getUsers')
        return response
    } catch (error) {
        return error
    }
}

const getSupervisores = async (): Promise<AxiosResponse|any> => {
    try {
        const response = await axios.get('/api/users/getSupervisores')
        return response
    } catch (error) {
        return error
    }
}

const getOperadores = async (): Promise<AxiosResponse|any> => {
    try {
        const response = await axios.get('/api/users/getOperadores')
        return response
    } catch (error) {
        return error
    }
}

export default {
    createUser,
    deleteUser,
    editUser,
    getUserById,
    getUsers,
    getSupervisores,
    getOperadores
}