import { createContext, useContext, useEffect, useState } from "react"
import { Usuario } from "../interfaces/Usuario"
import { LoginData } from "../interfaces/Login"
import { authRouter } from "../router"

interface AuthType {
    login:(data: LoginData) => Promise<boolean>
    logout: () => Promise<boolean>
    usuario?: Usuario
    isAuth: boolean
    loading: boolean
    userType?: string
    userRole?: string
}

export const AuthContext = createContext<AuthType>({} as AuthType)

export const AuthProvider = (props: any) => {

    const [usuario, setUsuario] = useState<Usuario>()
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [userAgent, setUserAgent] = useState<string>()
    const [userType, setUserType] = useState<string>()
    const [userRole, setUserRole] = useState<string>()
    const [isWindows, setIsWindows] = useState<boolean>(false)

    useEffect(() => {
        const userAgentTemp = navigator.userAgent || navigator.vendor
        setUserAgent(userAgentTemp)
        if (window.localStorage.getItem('usuario')) {
            setUsuario(JSON.parse(window.localStorage.getItem('usuario')||'{}'))
            setIsAuth(true)
        } else {
            setIsAuth(false)
        }
    }, [])

    useEffect(() => {
        if (userAgent) {
            let typeHardware : string
            if (/windows/i.test(userAgent)) {
                console.log(/windows/i.test(userAgent))
                typeHardware = "Windows"
                console.log(typeHardware)
                setIsWindows(true)
            }
            // Windows Phone must come first because its UA also contains "Android"
            if (/windows phone/i.test(userAgent)) {
                typeHardware = "Windows Phone"
                console.log(typeHardware)
            }
    
            if (/android/i.test(userAgent)) {
                typeHardware = "Android"
                console.log(typeHardware)
                console.log(/android/i.test(userAgent))
            }
    
            // iOS detection from: http://stackoverflow.com/a/9039885/177710
            if (/iPad|iPhone|iPod/.test(userAgent)) {
                typeHardware = "iOS"
                console.log(typeHardware)
            }

        }
    }, [userAgent])

    useEffect(() => {
        console.log(usuario)
        if (usuario) {
            if (usuario.subRoles?.length === 0 && usuario.role === 'superAdmin') {
                setUserType('admin')
                setLoading(false)
            } else {
                if (
                    (usuario.subRoles && 
                        ((usuario.subRoles[0] === 'Supervisor')||
                        (usuario.role === 'superAdmin'))
                    )&&(isWindows)) {
                    if (usuario.subRoles) {
                        setUserType(usuario.subRoles[0])
                    } else {
                        setUserType('admin')
                    }
                    setUserRole(usuario.role)
                    setTimeout(() => {
                        setLoading(false)
                    }, 1000);
                } else if (
                    (usuario.subRoles && 
                        ((usuario.subRoles[0] === 'Operador')||
                        (usuario.subRoles[1] === 'Operador'))
                    )&&(!isWindows)) {
                        if (usuario.subRoles) {
                            setUserType(usuario.subRoles[0])
                        } else {
                            setUserType('admin')
                        }
                        setUserRole(usuario.role)
                        setTimeout(() => {
                            setLoading(false)
                        }, 1000);
                } else {
                    setLoading(false)
                    alert('Las gestiones para su usuario deben ser desde un dispositivo de escritorio como PC o Notebook')
                }    
            }
        }
    },[usuario])

    useEffect(() => {
        console.log(userType)
    }, [userType])

    const login = (data: LoginData) => {
        return new Promise<boolean>(async resolve => {
            try {
                setLoading(true)
                const response: any = await authRouter.login(data)
                const user : Usuario = response.data.data
                setUsuario(user)
                setIsAuth(true)
                const token : string = response.data.token
                window.localStorage.setItem('token', token)
                window.localStorage.setItem('usuario', JSON.stringify(user))
                resolve(true)
            } catch (error: any) {
                setIsAuth(false)
                setLoading(false)
                alert(error.response.data.message)
                resolve(false)
            }
        })
    }

    const logout = () => {
        return new Promise<boolean>(resolve => {
            window.localStorage.clear()
            setIsAuth(false)
            resolve(true)
        })
    }

    const values = {
        login: login,
        logout: logout,
        usuario: usuario,
        isAuth: isAuth,
        loading: loading,
        userType: userType,
        userRole: userRole
    }

    return (
        <AuthContext.Provider value={values}>
          {props.children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)