import axios from "axios"
import { Contrato } from "../interfaces/Cliente"

const guardarContrato = async (contrato: Contrato) => {
    try {
        const response = await axios.post('/api/contratos/guardarContrato', contrato)
        return response
    } catch (error) {
        
    }
}

const leerContratos = async () => {
    try {
        const response = await axios.get('/api/contratos/leerContratos')
        return response
    } catch (error) {
        
    }
}

const leerContratosPorCliente = async (clienteId: string) => {
    try {
        const response = await axios.post('/api/contratos/leerContratosPorCliente', {clienteId:clienteId})
        return response
    } catch (error) {
        
    }
}

export default {
    guardarContrato,
    leerContratos,
    leerContratosPorCliente
}