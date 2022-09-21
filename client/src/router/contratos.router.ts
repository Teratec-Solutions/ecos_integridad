import axios from "axios"
import { Contrato } from "../interfaces/Cliente"

const guardarContrato = async (contrato: Contrato) => {
    try {
        const response = await axios.post('/api/contratos/guardarContrato', contrato)
        return response
    } catch (error) {
        
    }
}

export default {
    guardarContrato
}