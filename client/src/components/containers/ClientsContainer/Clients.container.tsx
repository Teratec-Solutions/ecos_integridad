import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonRow, IonSpinner, IonTitle, IonToggle, IonToolbar } from "@ionic/react"
import axios, { AxiosResponse } from "axios"
import { arrowBack, eye, pencil, trash } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { io } from "socket.io-client"
import { getDateWithTime } from "../../../functions"
import { Cliente } from "../../../interfaces/Cliente"
import './Clients.container.css'

const ClientsContainer = () => {
    const [ clientes, setClientes ] = useState<Cliente[]>([])
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const history = useHistory()
    console.log(history)
    useEffect(() => {
        const cliente : Cliente = JSON.parse(window.localStorage.getItem('cliente') || '{}')
        const socket = io()
        if (navigator.onLine) {
            socket.on(`actualizar_${cliente._id}`, data => {
                setIsLoading(true)
                console.log(data)
                getClientes()
            })
        }
        getClientes()
    }, [])
    const getClientes = async () => {
        const response: AxiosResponse = await axios.get('/api/clients/getClients', { withCredentials: true })
        console.log(response.data.data)
        setClientes(response.data.data)
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
                        Listado de Clientes
                    </IonTitle>
                    <IonButton slot="end">
                        Nuevo Cliente
                    </IonButton>
                </IonToolbar>
            </div>
            <div className="bg-content-users">
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <div className="map">

                            </div>
                        </IonCol>
                        <IonCol sizeXl="8" sizeLg="8" sizeMd="8">
                            <IonRow>
                                <IonCol size="1" className="tabla tabla-inicial">
                                    <p style={{ textAlign: 'center' }}></p>
                                </IonCol>
                                <IonCol size="3" className="tabla">
                                    <p style={{ textAlign: 'center'}}><strong>Nombre</strong></p>
                                </IonCol>
                                <IonCol size="2" className="tabla">
                                    <p style={{ textAlign: 'center'}}><strong>RUN</strong></p>
                                </IonCol>
                                <IonCol size="1" className="tabla">
                                    <p style={{ textAlign: 'center'}}><strong>Estado</strong></p>
                                </IonCol>
                                <IonCol size="2" className="tabla">
                                    <p style={{ textAlign: 'center'}}><strong>Fecha de creación</strong></p>
                                </IonCol>
                                <IonCol size="3" className="tabla tabla-final">
                                    <p style={{ textAlign: 'center'}}></p>
                                </IonCol>
                            </IonRow>
                            <div style={{ width: '100%', textAlign: 'center', marginTop: 50 }}>
                                <IonSpinner hidden={!isLoading} name="bubbles"/>
                            </div>
                            {
                                clientes?.map((cliente, index) => {
                                    return (
                                        <IonRow key={index}>
                                            <IonCol size="0.5" className="tabla center">
                                                <img src={`${cliente.empresa.imageLogo ? cliente.empresa.imageLogo : '../assets/images/logo/no-logo.png'}`} alt='profile' height={40} style={{ borderRadius: '50%' }} />
                                            </IonCol>
                                            <IonCol size="2" className="tabla">
                                                <p style={{ textAlign: 'center'}}>{cliente.empresa.nombre}</p>
                                            </IonCol>
                                            <IonCol size="1" className="tabla">
                                                <p style={{ textAlign: 'center'}}>{cliente.empresa.run}</p>
                                            </IonCol>
                                            <IonCol size="1" className="tabla" style={{ textAlign: 'center' }}>
                                                <IonRow>
                                                    <IonCol>
                                                        <IonToggle
                                                            disabled={true}
                                                            checked={cliente.habilitado}
                                                        />
                                                    </IonCol>
                                                    <IonCol>
                                                        <p>{cliente.habilitado ? 'Activado' : 'Desactivado'}</p>
                                                    </IonCol>
                                                </IonRow>
                                            </IonCol>
                                            <IonCol size="1" className="tabla">
                                                <p style={{ textAlign: 'center'}}>{getDateWithTime(cliente.createdAt)}</p>
                                            </IonCol>
                                            <IonCol size="2.5" className="tabla" style={{ textAlign: 'center' }}>
                                                <IonButton fill={'clear'}>
                                                    <IonIcon icon={eye} />
                                                </IonButton>
                                                <IonButton fill={'clear'} onClick={() => {history.push(`/user/${cliente._id}`)}}>
                                                    <IonIcon icon={pencil} />
                                                </IonButton>
                                                <IonButton fill={'clear'} color={'danger'}>
                                                    <IonIcon icon={trash} />
                                                </IonButton>
                                            </IonCol>

                                        </IonRow>
                                    )
                                })
                            }
                            {
                                (clientes?.length === 0) && <div style={{ textAlign: 'center', width: '100%' }}>
                                    <p hidden={isLoading}><strong>No hay clientes</strong></p>
                                </div>
                            }
                        
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>
        </IonContent>
    )
}

export default ClientsContainer