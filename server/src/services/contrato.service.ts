import { Cliente, Contrato } from "@/interfaces/clients.interface";
import clientModel from "@/models/clients.model";
import contratoModel from "@/models/contrato.model";

const contract = contratoModel
const client = clientModel

const guardarContrato = async (contrato: Contrato) => {
    try {
        const response = await contract.create({...contrato})
        const responseClient: Cliente = await client.findById(contrato.cliente)
        responseClient.contratos.push(response._id)
        await client.findByIdAndUpdate(responseClient._id, responseClient)
        return response
    } catch (error) {
        
    }
}

export default {
    guardarContrato
}