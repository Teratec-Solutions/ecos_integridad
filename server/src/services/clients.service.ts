import { env } from '@/configs'
import { Cliente } from '@/interfaces/clients.interface'
import clientModel from '@/models/clients.model'
import { HttpException } from '@exceptions/HttpException'
import { User } from '@interfaces/users.interface'
import { isEmpty } from '@utils/util'
import bcrypt from 'bcrypt'
import { __ } from 'i18n'

const client = clientModel

const findAllClient = async () => {
    const clients: Cliente[] = await client.find()
    return clients
}

const findClientById = async (clientId: string, locale: string = env.locale) => {
    if (isEmpty(clientId)) throw new HttpException(400, __({ phrase: 'An ID is required', locale }))
    const findClient: Cliente = await client.findOne({ _id: clientId }, '-password').populate('roles')
    if (!findClient) throw new HttpException(404, __({ phrase: 'User not found', locale }))
    return findClient
}

const editClient = async (usuario: Cliente, locale: string = env.locale) => {
    if (isEmpty(client)) throw new HttpException(400, __({ phrase: 'Datos de cliente no encontrados', locale }))
    const findClient: Cliente = await client.findByIdAndUpdate(usuario._id, usuario)
    console.log('Usuario editado: ', findClient)
    if (!findClient) throw new HttpException(404, __({ phrase: 'Client not found', locale }))
    return findClient 
}

/* const findClientsByRole = (role: string) => {
    return new Promise<User[]>( async resolve => {
        if (isEmpty(role)) throw new HttpException(400, __({ phrase: 'An ROLE is required' }))
        const findClients: Cliente[] = await client.find({ role: role })
        console.log(findClients)
        if (!findClients) throw new HttpException(404, __({ phrase: 'Users not found' }))
        resolve(findClients)
    })
} */

const createClient = async (clientData: Cliente, locale: string = env.locale) => {
    if (isEmpty(clientData)) throw new HttpException(400, __({ phrase: 'Credentials are required', locale }))
    /* const findClient: Cliente = await client.findOne({ email: clientData.email }, '-password') // .select('-password')
    if (findClient)
        throw new HttpException(
            409,
            __({ phrase: 'Email {{email}} already exists', locale }, { email: clientData.email })
        )

    const hashedPassword = await bcrypt.hash(clientData.password, 10) */
    const createClientData: Cliente = await client.create({ ...clientData })

    return createClientData
}

const updateClient = async (clientId: string, clientData: User, locale: string = env.locale) => {
    if (isEmpty(clientId)) throw new HttpException(400, __({ phrase: 'An ID is required', locale }))
    if (isEmpty(clientData)) throw new HttpException(400, __({ phrase: 'User data is required', locale }))

    if (clientData.email) {
        const findUser: Cliente = await client.findOne({ email: clientData.email })
        if (findUser && findUser._id.toString() !== clientId)
            throw new HttpException(
                409,
                __({ phrase: 'Email {{email}} already exists', locale }, { email: clientData.email })
            )
    }

    if (clientData.password) {
        const hashedPassword = await bcrypt.hash(clientData.password, 10)
        clientData = { ...clientData, password: hashedPassword }
    }

    const updateClientById: Cliente = await client.findByIdAndUpdate(clientId, { clientData })
    if (!updateClientById) throw new HttpException(409, __({ phrase: 'User not found', locale }))

    return updateClientById
}

const deleteClient = async (clientId: string, locale: string = env.locale) => {
    if (isEmpty(clientId)) throw new HttpException(400, __({ phrase: 'An ID is required', locale }))
    const deleteClientById: Cliente = await client.findByIdAndDelete(clientId)
    if (!deleteClientById) throw new HttpException(404, __({ phrase: 'User not found', locale }))

    return deleteClientById
}

export default {
    findAllClient,
    findClientById,
    editClient,
    /* findClientsByRole, */
    createClient,
    updateClient,
    deleteClient
}
