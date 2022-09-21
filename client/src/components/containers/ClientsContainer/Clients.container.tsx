import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonRow, IonSpinner, IonTitle, IonToggle, IonToolbar } from "@ionic/react"
import { AxiosResponse } from "axios"
import { add, arrowBack, clipboard, eye, pencil, personAdd, trash } from "ionicons/icons"
import { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router"
import { io } from "socket.io-client"
import { getDateWithTime } from "../../../functions"
import { Cliente } from "../../../interfaces/Cliente"
import { Usuario } from "../../../interfaces/Usuario"
import { clientsRouter } from "../../../router"
import { ClientContactModal, ClientContractModal, ClientModal } from "../../modals"
import './Clients.container.css'

const ClientsContainer = () => {
    const [ clientes, setClientes ] = useState<Cliente[]>([])
    const [ cliente, setCliente ] = useState<Cliente>()
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ openModal, setOpenModal ] = useState<boolean>(false)
    const [ openContractModal, setOpenContractModal ] = useState<boolean>(false)
    const [ openClient, setOpenClient ] = useState<boolean>(false)
    const history = useHistory()
    useEffect(() => {
        const usuario : Usuario = JSON.parse(window.localStorage.getItem('usuario') || '{}')
        const socket = io()
        if (navigator.onLine) {
            socket.on(`nuevoClienteCreado_${usuario._id}`, data => {
                console.log(data)
                setIsLoading(true)
                getClientes()
            })
        }
        getClientes()
    }, [])
    const getClientes = async () => {
        try {
            const response: AxiosResponse = await clientsRouter.getClients()
            console.log(response.data.data)
            setClientes(response.data.data)
            if (response) {
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const deleteClient = async (_id: string | undefined) => {
        if (window.confirm('Confirme para borrar cliente')) {
            try {
                if (_id) {
                    const response: AxiosResponse = await clientsRouter.deleteClient(_id)
                    if (response) {
                        alert('¡' + response.data.data.empresa.nombre + ' ' + response.data.message + '!')
                        console.log(response)
                        getClientes()
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    const sumarContrato = (cliente: Cliente) => {
        setOpenContractModal(true)
        setCliente(cliente)
    }
    const sumarContacto = (cliente: Cliente) => {
        setOpenModal(true)
        setCliente(cliente)
    }
    const closeModalContact = () => {
        setOpenModal(false)
    }
    const closeModalContract = () => {
        setOpenContractModal(false)
    }
    const openClientModal = (cliente: Cliente) => {
        setOpenClient(true)
        setCliente(cliente)
    }
    const closeClientModal = () => {
        setOpenClient(false)
    }
    return (
        <IonContent className="bg-content">
            <ClientContactModal isOpen={openModal} closeModal={closeModalContact} cliente={cliente} />
            <ClientContractModal isOpen={openContractModal} closeModal={closeModalContract} cliente={cliente} />
            <ClientModal isOpen={openClient} closeModal={closeClientModal} cliente={cliente} />
            <div className="titles">
                <IonToolbar style={{ borderRadius: 10 }}>
                    <IonButton slot="start" fill={'clear'} onClick={() => {history.goBack()}}>
                        <IonIcon icon={arrowBack} />
                    </IonButton>
                    <IonTitle>
                        Listado de Clientes
                    </IonTitle>
                    <IonButton slot="end" onClick={() => {history.push('/client')}}>
                        Nuevo Cliente
                    </IonButton>
                </IonToolbar>
            </div>
            <div className="bg-content-users">
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <div className="map">
                                <p style={{ width: '100%', textAlign: 'center', position: 'absolute' }}>Aquí va un mapa</p>
                            </div>
                        </IonCol>
                        <IonCol sizeXl="8" sizeLg="8" sizeMd="8">
                            <IonRow>
                                <IonCol size="1" className="tabla tabla-inicial">
                                    <p style={{ textAlign: 'center' }}></p>
                                </IonCol>
                                <IonCol size="2" className="tabla">
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
                                <IonCol size="4" className="tabla tabla-final">
                                    <p style={{ textAlign: 'center'}}></p>
                                </IonCol>
                            </IonRow>
                            {
                                clientes?.map((cliente, index) => {
                                    console.log(cliente)
                                    return (
                                        <IonRow key={index}>
                                            <IonCol size="1" className="tabla center">
                                                <img src={`${cliente.empresa.imageLogo ? cliente.empresa.imageLogo : '../assets/images/logo/no-logo.jpg'}`} alt='profile' height={40} width={40} style={{ borderRadius: '50%' }} />
                                            </IonCol>
                                            <IonCol size="2" className="tabla">
                                                <p style={{ textAlign: 'center'}}>{cliente.empresa && cliente.empresa.nombre}</p>
                                            </IonCol>
                                            <IonCol size="2" className="tabla">
                                                <p style={{ textAlign: 'center'}}>{cliente.empresa && cliente.empresa.run}</p>
                                            </IonCol>
                                            <IonCol size="1" className="tabla" style={{ textAlign: 'center' }}>
                                                {/* <IonRow> */}
                                                    {/* <IonCol>
                                                        <IonToggle
                                                            disabled={true}
                                                            checked={cliente.habilitado}
                                                        />
                                                    </IonCol> */}
                                                    {/* <IonCol> */}
                                                        <p>{cliente.habilitado ? 'Activado' : 'Desactivado'}</p>
                                                    {/* </IonCol> */}
                                                {/* </IonRow> */}
                                            </IonCol>
                                            <IonCol size="2" className="tabla">
                                                <p style={{ textAlign: 'center'}}>{getDateWithTime(cliente.createdAt)}</p>
                                            </IonCol>
                                            <IonCol size="4" className="tabla" style={{ textAlign: 'center' }}>
                                                <IonButton fill={'clear'} onClick={() => { openClientModal(cliente) }}>
                                                    <IonIcon icon={eye} />
                                                </IonButton>
                                                <IonButton fill={'clear'} onClick={() => { sumarContrato(cliente) }}>
                                                    <IonIcon icon={clipboard} />
                                                </IonButton>
                                                <IonButton fill={'clear'} onClick={() => { sumarContacto(cliente) }}>
                                                    <IonIcon icon={personAdd} />
                                                </IonButton>
                                                <IonButton fill={'clear'} onClick={() => {history.push(`/client/${cliente._id}`)}}>
                                                    <IonIcon icon={pencil} />
                                                </IonButton>
                                                <IonButton fill={'clear'} color={'danger'} onClick={() => { deleteClient(cliente._id ? cliente._id : '') }}>
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
                            <div hidden={!isLoading} style={{ width: '100%', textAlign: 'center', marginTop: 50 }}>
                                <IonSpinner hidden={!isLoading} name="bubbles"/>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>
        </IonContent>
    )
}

export default ClientsContainer