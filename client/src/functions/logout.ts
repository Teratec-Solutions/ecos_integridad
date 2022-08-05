import axios from "axios"
import { Usuario } from "../interfaces/Usuario"

const logout = async () => {
    const user: Usuario = JSON.parse(window.localStorage.getItem('usuario') || '{}')
    const response = await axios.post('/api/logout', user)
    return response
}

export default logout
