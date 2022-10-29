import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonRow, IonSpinner, IonTitle, IonToolbar } from '@ionic/react'
import { AxiosResponse } from 'axios'
import { arrowBack, clipboard, eye, location, pencil, personAdd, trash } from 'ionicons/icons'
import { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { io } from 'socket.io-client'
import { getDateWithTime } from '../../../functions'
import { Cliente } from '../../../interfaces/Cliente'
import { Usuario } from '../../../interfaces/Usuario'
import { clientsRouter } from '../../../router'
import { ClientContactModal, ClientContractModal, ClientModal } from '../../modals'
import './Clients.container.css'
import { GoogleMap } from '@capacitor/google-maps'

const ClientsContainer = () => {
    const [ clientes, setClientes ] = useState<Cliente[]>([])
    const [ cliente, setCliente ] = useState<Cliente>()
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ openModal, setOpenModal ] = useState<boolean>(false)
    const [ openContractModal, setOpenContractModal ] = useState<boolean>(false)
    const [ openClient, setOpenClient ] = useState<boolean>(false)
    const [ mapHeight, setMapHeight ] = useState<string | number>('')
    const [ mapWidth, setMapWidth ] = useState<string | number>('')
    const [ locate, setLocation ] = useState<{lat: number, lng: number}>()
    const [ mapData, setMapData ] = useState<GoogleMap>()
    const [ markerIdCurrent, setMarkerIdeCurrent ] = useState<string>()
    const history = useHistory()
    const mapRef = useRef<HTMLElement>()
    let newMap: GoogleMap
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
                setLocation({lat: -37.179167, lng: -72.250023})
                setMapHeight(document.getElementById('map')?.offsetHeight || '')
                setMapWidth(document.getElementById('map')?.offsetWidth || '')
                createMap(response.data.data)
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
    const cargarDatosMapa = (location: {lat: number, lng: number} | undefined) => {
        if (location) {
            console.log(Number(location.lat), Number(location.lng))
            if ((Number(location.lat)===0) && (Number(location.lng)===0)) {
                mapData?.setCamera({
                    coordinate: {
                        lat: -37.179167,
                        lng: -72.250023,
                    },
                    zoom: 6
                })
            } else {
                changeCamera(location)
            }
        } else {
            mapData?.setCamera({
                coordinate: {
                    lat: -37.179167,
                    lng: -72.250023,
                },
                zoom: 6
            })
        }
    }
    const createMap = async (clientesData: Cliente[]) => {
        if (!mapRef.current) return
        newMap = await GoogleMap.create({
            id: 'my-cool-map',
            element: mapRef.current,
            apiKey: 'AIzaSyAjVKBoOpm3dayGqiMCxPyXmqBhU-hgUrA',
            config: {
                center: {
                    lat: locate ? locate.lat : -37.179167,
                    lng: locate ? locate.lng : -72.250023,
                },
                zoom: 6
            }
        })
        clientesData.map(async (cliente, index) => {
            /* console.log(cliente.empresa.location?.lat, cliente.empresa.location?.lng) */
            if (cliente.empresa.location && (cliente.empresa.location?.lat.toString().length > 0)) {
                console.log(cliente.empresa.location.lat, cliente.empresa.location.lng)
                await newMap.addMarker({
                    coordinate: {
                        lat: Number(cliente.empresa.location.lat),
                        lng: Number(cliente.empresa.location.lng),
                    }
                })
            } else {
                console.log('no hay')
            }
        })
        /* const markerId: string = await newMap.addMarker({
            coordinate: {
                lat: locate ? locate.lat : -37.179167,
                lng: locate ? locate.lng : -72.250023,
            }
        }) */
        /* setMarkerIdeCurrent(markerId) */
        setMapData(newMap)
        // Handle marker click
        await newMap.setOnMarkerClickListener((event) => {console.log(event)});
        await newMap.enableAccessibilityElements(false);
        await newMap.enableIndoorMaps(false)
        /* // Enable marker clustering
        await newMap.enableClustering();



        // Clean up map reference
        await newMap.destroy();
        setMapData(newMap) */
    }
    const changeCamera = async (location: {lat: number, lng: number}) => {
        mapData?.setCamera({
            coordinate: {
                lat: Number(location.lat),
                lng: Number(location.lng),
            },
            zoom: 16
        })
    }
    return (
        <IonContent className='bg-content'>
            <ClientContactModal isOpen={openModal} closeModal={closeModalContact} cliente={cliente} />
            <ClientContractModal isOpen={openContractModal} closeModal={closeModalContract} cliente={cliente} />
            <ClientModal isOpen={openClient} closeModal={closeClientModal} cliente={cliente} />
            <div className='titles'>
                <IonToolbar style={{ borderRadius: 10 }}>
                    <IonButton slot='start' fill={'clear'} onClick={() => {history.goBack()}}>
                        <IonIcon icon={arrowBack} />
                    </IonButton>
                    <IonTitle>
                        Listado de Clientes
                    </IonTitle>
                    <IonButton slot='end' onClick={() => {history.push('/client')}}>
                        Nuevo Cliente
                    </IonButton>
                </IonToolbar>
            </div>
            <div className='bg-content-users'>
                <IonGrid>
                    <IonRow>
                        <IonCol sizeXl='4' sizeLg='4' sizeMd='4'>
                            <div className='map' id='map'>
                                <div className="component-wrapper">
                                    <capacitor-google-map ref={mapRef} style={{
                                        display: 'inline-block',
                                        width: mapWidth,
                                        height: mapHeight
                                    }}></capacitor-google-map>
                                </div>
                                {/* {
                                    (latitud && longitud && zoomMap) && 
                                    <MapsComponent
                                        newMap={newMap}
                                        height={mapHeight}
                                        width={mapWidth}
                                        location={location}
                                    />} */}
                            </div>
                        </IonCol>
                        <IonCol sizeXl='8' sizeLg='8' sizeMd='8'>
                            <IonRow>
                                <IonCol size='1' className='tabla tabla-inicial'>
                                    <p style={{ textAlign: 'center' }}></p>
                                </IonCol>
                                <IonCol size='2' className='tabla'>
                                    <p style={{ textAlign: 'center'}}><strong>Nombre</strong></p>
                                </IonCol>
                                <IonCol size='2' className='tabla'>
                                    <p style={{ textAlign: 'center'}}><strong>RUN</strong></p>
                                </IonCol>
                                <IonCol size='1' className='tabla'>
                                    <p style={{ textAlign: 'center'}}><strong>Estado</strong></p>
                                </IonCol>
                                <IonCol size='2' className='tabla'>
                                    <p style={{ textAlign: 'center'}}><strong>Fecha de creación</strong></p>
                                </IonCol>
                                <IonCol size='4' className='tabla tabla-final'>
                                    <p style={{ textAlign: 'center'}}></p>
                                </IonCol>
                            </IonRow>
                            {
                                clientes?.map((cliente, index) => {
                                    console.log(cliente)
                                    return (
                                        <IonRow key={index}>
                                            <IonCol size='1' className='tabla center'>
                                                <img src={`${cliente.empresa.imageLogo ? cliente.empresa.imageLogo : '../assets/images/logo/no-logo.jpg'}`} alt='profile' height={40} width={40} style={{ borderRadius: '50%' }} />
                                            </IonCol>
                                            <IonCol size='2' className='tabla'>
                                                <p style={{ textAlign: 'center'}}>{cliente.empresa && cliente.empresa.nombre}</p>
                                            </IonCol>
                                            <IonCol size='2' className='tabla'>
                                                <p style={{ textAlign: 'center'}}>{cliente.empresa && cliente.empresa.run}</p>
                                            </IonCol>
                                            <IonCol size='1' className='tabla' style={{ textAlign: 'center' }}>
                                                <p>{cliente.habilitado ? 'Activado' : 'Desactivado'}</p>
                                            </IonCol>
                                            <IonCol size='2' className='tabla'>
                                                <p style={{ textAlign: 'center'}}>{getDateWithTime(cliente.createdAt)}</p>
                                            </IonCol>
                                            <IonCol size='4' className='tabla' style={{ textAlign: 'center' }}>
                                                <IonButton fill={'clear'} onClick={() => { cargarDatosMapa(cliente.empresa.location)}}>
                                                    <IonIcon icon={location} />
                                                </IonButton>
                                                <IonButton fill={'clear'} onClick={() => { openClientModal(cliente); cargarDatosMapa(cliente.empresa.location)}}>
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
                                <IonSpinner hidden={!isLoading} name='bubbles'/>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>
        </IonContent>
    )
}

export default ClientsContainer