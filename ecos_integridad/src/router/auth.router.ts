import axios from 'axios'
import { LoginData } from '../interfaces/Login'

const login = (data: LoginData) => {
    try {
        const response = axios.post('/api/login', data)
        return response
    } catch (error) {
        return error
    }
}

export default {
    login
}

