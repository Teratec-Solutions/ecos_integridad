import { locale } from '@configs/env'
import { NextFunction, Request, Response } from 'express'
import { RequestWithUser } from '@interfaces/auth.interface'
import { Cliente } from '@/interfaces/clients.interface'
import ClientsService from '@/services/clients.service'

const getClients = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const findAllClientsData: Cliente[] = await ClientsService.findAllClient()
        res.status(200).json({ data: findAllClientsData, message: 'findAll' })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const getClientById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const clientId: string = req.body.id
        const clientLocale = req.cookies.language || locale
        const findOneClientData: Cliente = await ClientsService.findClientById(clientId, clientLocale)

        res.status(200).json({ data: findOneClientData, message: 'findOne' })
    } catch (error) {
        next(error)
    }
}

const createClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const clientData: Cliente = req.body
        const clientLocale = req.cookies.language || locale
        const createClientData: Cliente = await ClientsService.createClient(clientData, clientLocale)
        res.status(201).json({ data: createClientData, message: 'created' })
    } catch (error) {
        next(error)
    }
}

const editClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const clientData: Cliente = req.body
        console.log(clientData)
        const updateClientData: Cliente = await ClientsService.editClient(clientData)
        console.log(updateClientData)
        res.status(200).json({ data: updateClientData, message: 'updated' })
    } catch (error) {
        next(error)
    }
}

const deleteClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const clientId: string = req.params.id
        const clientLocale = req.cookies.language || locale
        const deleteClientData: Cliente = await ClientsService.deleteClient(clientId, clientLocale)

        res.status(200).json({ data: deleteClientData, message: 'deleted' })
    } catch (error) {
        next(error)
    }
}

export default {
    getClients,
    getClientById,
    createClient,
    editClient,
    deleteClient
}
