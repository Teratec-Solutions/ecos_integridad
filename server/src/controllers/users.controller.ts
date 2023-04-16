import { locale } from '@configs/env'
import { User } from '@interfaces/users.interface'
import UserService from '@services/users.service'
import { NextFunction, Request, Response } from 'express'
import { RequestWithUser } from '@interfaces/auth.interface'

const getUsers = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const findAllUsersData: User[] = await UserService.findAllUser()
        res.status(200).json({ data: findAllUsersData, message: 'findAll' })
    } catch (error) {
        console.log(error)
        next(error)
    }
}
const getSupervisores = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const findSupervisores: User[] = await UserService.findSupervisores()
        res.status(200).json({ data: findSupervisores, message: 'lista supervisores' })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const getOperadores = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const findOperadores: User[] = await UserService.findOperadores()
        res.status(200).json({ data: findOperadores, message: 'lista operadores' })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: string = req.body.id
        const userLocale = req.cookies.language || locale
        const findOneUserData: User = await UserService.findUserById(userId, userLocale)

        res.status(200).json({ data: findOneUserData, message: 'findOne' })
    } catch (error) {
        next(error)
    }
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData: User = req.body
        const userLocale = req.cookies.language || locale
        const createUserData: User = await UserService.createUser(userData, userLocale)
        res.status(201).json({ data: createUserData, message: 'created' })
    } catch (error) {
        next(error)
    }
}

const editUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData: User = req.body
        console.log(userData)
        const updateUserData: User = await UserService.editUser(userData)
        console.log(updateUserData)
        res.status(200).json({ data: updateUserData, message: 'updated' })
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: string = req.body.id
        const userLocale = req.cookies.language || locale
        const deleteUserData: User = await UserService.deleteUser(userId, userLocale)

        res.status(200).json({ data: deleteUserData, message: 'deleted' })
    } catch (error) {
        next(error)
    }
}

export default {
    getUsers,
    getSupervisores,
    getOperadores,
    getUserById,
    createUser,
    editUser,
    deleteUser
}
