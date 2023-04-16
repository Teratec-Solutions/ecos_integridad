import { createContext, useContext, useEffect, useState } from "react";
import { Usuario } from "../interfaces/Usuario";
import { AuthContext } from "./Auth.context";
import { usersRouter } from "../router";
import { io } from "socket.io-client";
interface UsersType {
    users: Usuario[]
    loading: boolean
    deleteUser: (idUser: string) => Promise<any>
}
export const UsersContext = createContext<UsersType>({} as UsersType)

export const UsersProvider = (props: any) => {
    const {isAuth, userType, usuario} = useContext(AuthContext)
    const [users, setUsers] = useState<Usuario[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (isAuth && usuario) {
            const socket = io()
            if (navigator.onLine && usuario) {
                socket.on(`nuevoUsuario_${usuario._id}`, data => {
                    getUsers()
                })
                socket.on(`usuarioEliminado_${usuario._id}`, data => {
                    getUsers()
                })
            }
        }
    },[isAuth, usuario])

    useEffect(() => {
        if (userType === 'admin') {
            getUsers()
        }
    }, [isAuth, userType])

    const getUsers = async () => {
        setLoading(true)
        const response = await usersRouter.getUsers()
        setUsers(response.data.data)
        setLoading(false)
    }

    const deleteUser = async (userId: string) => {
        if (window.confirm('Confirme la eliminación del usuario. Esta acción no podrá ser restaurada.')) {
            const response = await usersRouter.deleteUser(userId)
            return response.data
        }
    }

    const values = {
        users: users,
        loading: loading,
        deleteUser: deleteUser
    }

    return (
        <UsersContext.Provider value={values}>
          {props.children}
        </UsersContext.Provider>
    )
}

export const useUsersContext = () => useContext(UsersContext)