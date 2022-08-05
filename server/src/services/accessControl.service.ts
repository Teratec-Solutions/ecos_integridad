import { AccessControl } from 'accesscontrol'
import bcrypt from 'bcrypt'
import { __ } from 'i18n'
import { ObjectId } from 'mongoose'
import { User } from '@/interfaces/users.interface'
import userModel from '@/models/users.model'
import { isEmpty } from '@/utils/util'
import usersService from './users.service'

const ac = new AccessControl()

const initAccessControl = async () => {
    const findSuperAdmin = await userModel.findOne({role: 'superAdmin'})
    if (!findSuperAdmin) {
        const userData = {
            nombre: process.env.NOMBRE,
            apellido1: process.env.APELLIDO1,
            email: process.env.EMAIL,
            password: process.env.PASSWORD,
            role: process.env.ROLE,
        } as User
        const res = await usersService.createUser(userData)
        if (res) {
            console.log('Super Usuario Creado')
        }
    } else {
        console.log('Super Usuario Existente')
    }
}

const updateAccessControl = async () => {
    const parsedRoles = {}
    ac.setGrants(parsedRoles)
    return 'Access Control updated'
}

/**
 * Function to check permissions of a role against the Access Control.
 * @param {*} role Id of the role in DB
 * @param {*} resource Name of the resource given by mongoose collection
 * @param {*} type Type of action over the resource (e.g. createAny or createOwn)
 * @returns AccessControl~Permission, defines the granted or denied access permissions to the target resource and role
 */
const check = (role: ObjectId, resource: string, type: string) => {
    const typeResponses = {
        createAny: ac.can(role.toString()).createAny(resource),
        readAny: ac.can(role.toString()).readAny(resource),
        updateAny: ac.can(role.toString()).updateAny(resource),
        deleteAny: ac.can(role.toString()).deleteAny(resource),
        createOwn: ac.can(role.toString()).createOwn(resource),
        readOwn: ac.can(role.toString()).readOwn(resource),
        updateOwn: ac.can(role.toString()).updateOwn(resource),
        deleteOwn: ac.can(role.toString()).deleteOwn(resource)
    }
    if (!Object.keys(typeResponses).includes(type)) return ac.can(role.toString()).readAny('NONRESOURCE')
    return typeResponses[type]
}

const createSuperAdmin = async (): Promise<User> => {
    const hashedPassword = await bcrypt.hash(process.env.PASSWORD, 10)
    const user: User = await userModel.findOneAndUpdate(
        { email: process.env.EMAIL },
        {
            $setOnInsert: {
                nombre: process.env.NOMBRE,
                ...(!isEmpty(process.env.APELLIDO1) && { apellido1: process.env.APELLIDO1 }),
                email: process.env.EMAIL,
                password: hashedPassword,
            }
        },
        { new: true, upsert: true }
    )
    return user
}

export default {
    ac,
    check,
    createSuperAdmin,
    initAccessControl,
    updateAccessControl,
}
