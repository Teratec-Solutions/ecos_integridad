import { createContext, useContext, useEffect, useState } from "react"
import { Cliente } from "../interfaces/Cliente"
import { AuthContext } from "./Auth.context"
import { clientsRouter } from "../router"
import { io } from "socket.io-client"

interface ClientsType {
    clients: Cliente[]
    loading: boolean
}
export const ClientsContext = createContext<ClientsType>({} as ClientsType)

export const ClientsProvider = (props: any) => {
    const {isAuth, userType, usuario} = useContext(AuthContext)
    const [clients, setClients] = useState<Cliente[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (isAuth && usuario) {
            const socket = io()
            if (navigator.onLine && usuario) {
                socket.on(`nuevoClienteCreado_${usuario._id}`, data => {
                    getClients()
                })
                socket.on(`clienteEliminado_${usuario._id}`, data => {
                    getClients()
                })
            }
        }
    },[isAuth])
    
    useEffect(() => {
        if (isAuth)
        if (userType === 'admin') {
            getClients()
        }
    }, [isAuth, userType])

    const getClients = async () => {
        setLoading(true)
        const response = await clientsRouter.getClients()
        setClients(response.data.data)
        setLoading(false)
    }

    const values = {
        clients: clients,
        loading: loading
    }

    return (
        <ClientsContext.Provider value={values}>
          {props.children}
        </ClientsContext.Provider>
    )
}

export const useClientsContext = () => useContext(ClientsContext)