import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonRow, IonSpinner, IonTitle, IonToggle, IonToolbar } from "@ionic/react"
import axios, { AxiosResponse } from "axios"
import { arrowBack, eye, pencil, trash } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { getDateWithTime, nombreRole } from "../../../functions"
import { Usuario } from "../../../interfaces/Usuario"
import { io } from "socket.io-client";

const UsersContainer = () => {
    const [ usuarios, setUsuarios ] = useState<Usuario[]>([])
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const history = useHistory()
    console.log(history)
    useEffect(() => {
        const usuario : Usuario = JSON.parse(window.localStorage.getItem('usuario') || '{}')
        const socket = io()
        if (navigator.onLine) {
            socket.on(`actualizar_${usuario._id}`, data => {
                setIsLoading(true)
                console.log(data)
                getUsuarios()
            })
        }
        getUsuarios()
    }, [])
    const getUsuarios = async () => {
        const response: AxiosResponse = await axios.get('/api/users/getUsers', { withCredentials: true })
        console.log(response.data.data)
        setUsuarios(response.data.data)
        if (response) {
            setIsLoading(false)
        }
    }
    return (
        <IonContent className="bg-content">
            <div className="titles">
                <IonToolbar style={{ borderRadius: 10 }}>
                    <IonButton slot="start" fill={'clear'} onClick={() => {history.goBack()}}>
                        <IonIcon icon={arrowBack} />
                    </IonButton>
                    <IonTitle>
                        Listado de Usuarios
                    </IonTitle>
                    <IonButton slot="end" onClick={() => {history.push('/user')}}>
                        Nuevo Usuario
                    </IonButton>
                </IonToolbar>
            </div>
            <div className="bg-content-users">
                <IonGrid style={{ textAlign: 'center' }}>
                    <IonRow>
                        <IonCol size="0.5" className="tabla tabla-inicial">
                            <p style={{ textAlign: 'center' }}></p>
                        </IonCol>
                        <IonCol size="2" className="tabla">
                            <p style={{ textAlign: 'center'}}><strong>Nombre y Apellido</strong></p>
                        </IonCol>
                        <IonCol size="1" className="tabla">
                            <p style={{ textAlign: 'center'}}><strong>RUN</strong></p>
                        </IonCol>
                        <IonCol size="1" className="tabla">
                            <p style={{ textAlign: 'center'}}><strong>Tipo de usuario</strong></p>
                        </IonCol>
                        <IonCol size="1" className="tabla">
                            <p style={{ textAlign: 'center'}}><strong>Estado</strong></p>
                        </IonCol>
                        <IonCol size="1" className="tabla">
                            <p style={{ textAlign: 'center'}}><strong>Fono contacto</strong></p>
                        </IonCol>
                        <IonCol size="2" className="tabla">
                            <p style={{ textAlign: 'center'}}><strong>Email contacto</strong></p>
                        </IonCol>
                        <IonCol size="1" className="tabla">
                            <p style={{ textAlign: 'center'}}><strong>Fecha de creación</strong></p>
                        </IonCol>
                        <IonCol size="2.5" className="tabla tabla-final">
                            <p style={{ textAlign: 'center'}}></p>
                        </IonCol>
                    </IonRow>
                    <IonSpinner hidden={!isLoading} name="bubbles"/>
                    {
                        usuarios?.map((usuario, index) => {
                            return (
                                <IonRow key={index}>
                                    <IonCol size="0.5" className="tabla center">
                                        <img src={`${usuario.imagenPerfil ? usuario.imagenPerfil : '../assets/images/profile/profile_default.png'}`} alt='profile' height={40} style={{ borderRadius: '50%' }} />
                                    </IonCol>
                                    <IonCol size="2" className="tabla">
                                        <p style={{ textAlign: 'center'}}>{usuario.nombre} {usuario.apellido1}</p>
                                    </IonCol>
                                    <IonCol size="1" className="tabla">
                                        <p style={{ textAlign: 'center'}}>{usuario.run}</p>
                                    </IonCol>
                                    <IonCol size="1" className="tabla">
                                        <p style={{ textAlign: 'center'}}>{nombreRole(usuario.role)}</p>
                                    </IonCol>
                                    <IonCol size="1" className="tabla" style={{ textAlign: 'center' }}>
                                        <IonRow>
                                            <IonCol>
                                                <IonToggle
                                                    disabled={true}
                                                    checked={usuario.estado}
                                                />
                                            </IonCol>
                                            <IonCol>
                                                <p>{usuario.estado ? 'Activado' : 'Desactivado'}</p>
                                            </IonCol>
                                        </IonRow>
                                    </IonCol>
                                    <IonCol size="1" className="tabla">
                                        <p style={{ textAlign: 'center'}}>{usuario.fono}</p>
                                    </IonCol>
                                    <IonCol size="2" className="tabla">
                                        <p style={{ textAlign: 'center'}}>{usuario.email}</p>
                                    </IonCol>
                                    <IonCol size="1" className="tabla">
                                        <p style={{ textAlign: 'center'}}>{getDateWithTime(usuario.createdAt)}</p>
                                    </IonCol>
                                    <IonCol size="2.5" className="tabla" style={{ textAlign: 'center' }}>
                                        <IonButton fill={'clear'}>
                                            <IonIcon icon={eye} />
                                        </IonButton>
                                        <IonButton fill={'clear'} onClick={() => {history.push(`/user/${usuario._id}`)}} disabled={(usuario.role === "superAdmin") ? true : false}>
                                            <IonIcon icon={pencil} />
                                        </IonButton>
                                        <IonButton fill={'clear'} color={'danger'} disabled={(usuario.role === "superAdmin") ? true : false}>
                                            <IonIcon icon={trash} />
                                        </IonButton>
                                    </IonCol>
                                </IonRow>
                            )
                        })
                    }
                    {
                        (usuarios?.length === 0) && <div style={{ textAlign: 'center', width: '100%' }}>
                            <p hidden={isLoading}><strong>No hay usuarios</strong></p>
                        </div>
                    }
                </IonGrid>
            </div>
        </IonContent>
    )
}

export default UsersContainer
