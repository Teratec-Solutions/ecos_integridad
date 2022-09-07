import { IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption, IonToolbar } from "@ionic/react"
import axios, { AxiosResponse } from "axios"
import { briefcase, list, logOut, map, options, peopleCircle } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { logout } from "../../../functions"
import { Cliente } from "../../../interfaces/Cliente"

const HomeContainer = ({userType}:{userType: string}) => {
    const [clientes, setClientes] = useState<Cliente[]>([])
    const history = useHistory()
    const salir = async () => {
        const response = await logout()
        if (response) {
            history.replace('/login')
        }
    }
    useEffect(() => {
      console.log(userType)
      getClientes()
    }, [])
    const getClientes = async () => {
        const response: AxiosResponse = await axios.get('/api/clients/getClients', { withCredentials: true })
        console.log(response.data.data)
        setClientes(response.data.data)
        /* if (response) {
            setIsLoading(false)
        } */
    }
    return (
        <IonContent className="bg-content">
            <IonGrid>
                <IonRow>
                    <IonCol sizeXl="3">
                        <div className="leftSideMenu">
                            <div className="leftSideMenuData">
                                <h1>Menu</h1>
                                <IonItem button style={{ borderRadius: 30 }} onClick={() => {history.push('/users')}}>
                                    <IonIcon slot="start" icon={peopleCircle} color={'primary'} />
                                    <IonLabel color={'primary'}>
                                        <strong>Lista de Usuarios</strong>
                                    </IonLabel>
                                </IonItem>
                                <IonItem button style={{ borderRadius: 30 }} onClick={() => {history.push('/clients')}}>
                                    <IonIcon slot="start" icon={briefcase} color={'primary'} />
                                    <IonLabel color={'primary'}>
                                        <strong>Lista de Clientes</strong>
                                    </IonLabel>
                                </IonItem>
                                <IonItem button style={{ borderRadius: 30 }} onClick={() => {history.push('/work-orders')}}>
                                    <IonIcon slot="start" icon={list} color={'primary'} />
                                    <IonLabel color={'primary'}>
                                        <strong>Lista de OT</strong>
                                    </IonLabel>
                                </IonItem>
                                <IonItem button style={{ borderRadius: 30 }}>
                                    <IonIcon slot="start" icon={map} color={'primary'} />
                                    <IonLabel color={'primary'}>
                                        <strong>Mapa</strong>
                                    </IonLabel>
                                </IonItem>
                                <IonItem button style={{ borderRadius: 30 }}>
                                    <IonIcon slot="start" icon={options} color={'primary'} />
                                    <IonLabel color={'primary'}>
                                        <strong>Opciones</strong>
                                    </IonLabel>
                                </IonItem>
                                <IonItem button style={{ borderRadius: 30 }} onClick={() => {salir()}}>
                                    <IonIcon slot="start" icon={logOut} color={'primary'} />
                                    <IonLabel color={'primary'}>
                                        <strong>Salir</strong>
                                    </IonLabel>
                                </IonItem>
                                <div style={{ position: 'absolute', bottom: 10, left: 0, width: '100%', textAlign: 'center' }}>
                                    <img src="./assets/images/logo/logo.png" width={100} />
                                </div>
                            </div>
                        </div>
                    </IonCol>
                    <IonCol sizeXl="3">
                        <div className="leftSideMenu">
                            <div className="leftSideMenuData">
                                <h1>Clientes</h1>
                                {
                                    clientes.map((cliente, index) => {
                                        return (
                                            <IonItem button key={index}>
                                                <IonLabel color={'primary'}>
                                                    {cliente.empresa.nombre}
                                                </IonLabel>
                                            </IonItem>
                                        )
                                    })
                                }
                                {
                                    (clientes.length === 0) && <IonItem>
                                                                    <IonLabel color={'primary'}>
                                                                        Sin Clientes Inscritos
                                                                    </IonLabel>
                                                                </IonItem>
                                }
                            </div>
                        </div>
                    </IonCol>
                    <IonCol sizeXl="6">
                        <div className="leftSideMenu">
                            <div className="leftSideMenuData">
                                <h1>
                                    Datos del cliente
                                </h1>
                                <p>
                                    <strong>
                                        No disponible
                                    </strong>
                                </p>
                            </div>
                        </div>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default HomeContainer
