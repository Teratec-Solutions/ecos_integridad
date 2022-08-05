import { locale } from '@configs/env'
import { RequestWithUser } from '@interfaces/auth.interface'
import { User } from '@interfaces/users.interface'
import AuthService from '@services/auth.service'
import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongoose'


const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData: User = req.body
        const userLocale = req.cookies.language || locale
        const { cookie, createdUser } = await AuthService.signup(userData, userLocale)

        res.setHeader('Set-Cookie', [cookie])
        res.status(201).json({ data: createdUser, message: 'signup' })
    } catch (error) {
        next(error)
    }
}

const logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData: User = req.body
        const userLocale = req.cookies.language || locale
        const { cookie, findUser, token } = await AuthService.login(userData, userLocale)

        res.setHeader('Set-Cookie', [cookie])
        res.status(200).json({ data: findUser, token: token.token, message: 'login' })
    } catch (error) {
        next(error)
    }
}

const logOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData: User = req.body
        console.log(userData)
        const userLocale = req.cookies.language || locale
        const logOutUserData: User = await AuthService.logout(userData, userLocale)

        res.setHeader('Set-Cookie', ['Authorization=; Max-age=0'])
        res.status(200).json({ data: logOutUserData, message: 'logout' })
    } catch (error) {
        next(error)
    }
}

const verifyUserEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = req.body?.token.toString()
        const userId: ObjectId = AuthService.verifyToken(token, true)._id
        const userLocale: string = req.cookies.language || locale
        const verifyUserData: User = await AuthService.verifyUserEmail(userId, userLocale)

        res.status(200).json({ data: verifyUserData, message: 'verified' })
    } catch (error) {
        next(error)
    }
}

const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email: string = req.body?.email?.toString()
        const userLocale: string = req.cookies.language || locale
        const resetUserPassword: User = await AuthService.forgotPassword(email, userLocale)

        res.status(200).json({ data: resetUserPassword, message: 'email sent' })
    } catch (error) {
        next(error)
    }
}

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = req.body?.token.toString()
        const password: string = req.body?.password?.toString()
        const userLocale: string = req.cookies.language || locale
        const resetUserPassword: User = await AuthService.resetPassword(token, password, userLocale)

        res.status(200).json({ data: resetUserPassword, message: 'password reset' })
    } catch (error) {
        next(error)
    }
}

export default {
    signUp,
    logIn,
    logOut,
    verifyUserEmail,
    forgotPassword,
    resetPassword
}
