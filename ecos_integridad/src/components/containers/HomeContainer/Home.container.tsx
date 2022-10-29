import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react"
import axios, { AxiosResponse } from "axios"
import { briefcase, list, logOut, map, options, peopleCircle } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { logout } from "../../../functions"
import { Cliente } from "../../../interfaces/Cliente"
import { Usuario } from "../../../interfaces/Usuario"
import { clientsRouter } from "../../../router"

const HomeContainer = ({userType}:{userType: string | undefined}) => {
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [clientesCache, setClientesCache] = useState<Cliente[]>([])
    const [cliente, setCliente] = useState<Cliente>()
    const [usuario, setUsuario] = useState<Usuario>()
    const history = useHistory()
    const salir = async () => {
        if(window.confirm('Confirme que saldrá del sistema')) {
            const response = await logout()
            if (response) {
                history.replace('/login')
            }
        }
    }
    useEffect(() => {
      console.log(userType)
      getClientes()
      getUserData()
    }, [])
    
    const getClientes = async () => {
        try {
            const response: AxiosResponse = await clientsRouter.getClients() /* await axios.get('/api/clients/getClients', { withCredentials: true }) */
            console.log(response.data.data)
            setClientes(response.data.data)
            setClientesCache(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const selectCliente = (cliente: Cliente) => {
        console.log(cliente)
        setCliente(cliente)
    }
    const searchCliente = (value: string) => {
        const response = clientesCache.filter(cliente => {
            if (cliente.empresa.nombre.match(value) || cliente.empresa.run.match(value)) {
                return cliente
            } else {
                return null
            }
        })
        setClientes(response)
    }
    const getUserData = () => {
        const user: Usuario = JSON.parse(window.localStorage.getItem('usuario')||'{}')
        setUsuario(user)
        console.log(user.role)
    }
    return (
        <IonContent className="bg-content-home">
            <IonGrid>
                <IonRow>
                    <IonCol sizeXl="3" sizeLg="4" sizeMd="4" sizeSm="12" sizeXs="12">
                        <div className="leftSideMenu">
                            <div className="leftSideMenuData">
                                <div className="leftSideMenuContainer">
                                    <img src="./assets/images/profile/profile_default.png" className="profileHomeImage" alt="" />
                                    <h2>{usuario?.nombre} {usuario?.apellido1}</h2>
                                    <h4>{(usuario?.subRoles?.length === 1) ? usuario.subRoles[0] : 'Super Administrador'}</h4>
                                    {/* <h4>{usuario?.role}</h4> */}
                                    <br />
                                    <IonButton shape={'round'} fill={'solid'} onClick={salir}>
                                        Cerrar Sesión
                                    </IonButton>
                                </div>
                                <div style={{ position: 'absolute', bottom: 10, left: 0, width: '100%', textAlign: 'center' }}>
                                    <img src="./assets/images/logo/logo.png" width={200} />
                                </div>
                            </div>
                        </div>
                    </IonCol>
                    <IonCol sizeXl="9" sizeLg="8" sizeMd="8">
                        <div className="leftSideMenu">
                            <div className="homeContainer">
                                <div
                                   className="separationTopHomeContainer"
                                >

                                </div>
                                <IonRow>
                                    <IonCol sizeXl="1.5" sizeLg="1" sizeMd="1"></IonCol>
                                    <IonCol sizeXl="3" sizeLg="3" sizeMd="3">
                                        <IonCard
                                            disabled={(usuario?.role === 'usuario') ? true : false}
                                            onClick={() => {history.push('/users')}}
                                            button
                                            className="homeContainerButton"
                                        >
                                            <IonIcon 
                                                className="homeContainerButtonIcon"
                                                color="primary" icon={peopleCircle} />
                                            <br />
                                            <IonLabel
                                                color={'primary'}
                                                className="homeContainerButtonLabel"
                                            >
                                                Usuarios
                                            </IonLabel>
                                            <br />
                                        </IonCard>
                                    </IonCol>
                                    <IonCol sizeXl="3">
                                        <IonCard
                                            onClick={() => {history.push('/clients')}}
                                            button
                                            className="homeContainerButton"
                                        >
                                            <IonIcon 
                                                className="homeContainerButtonIcon"
                                                color="primary" icon={briefcase} />
                                            <br />
                                            <IonLabel
                                                color={'primary'}
                                                className="homeContainerButtonLabel"
                                            >
                                                Clientes
                                            </IonLabel>
                                        </IonCard>
                                    </IonCol>
                                    <IonCol sizeXl="3">
                                        <IonCard
                                            onClick={() => {history.push('/work-orders')}}
                                            button
                                            className="homeContainerButton"
                                        >
                                            <IonIcon 
                                                className="homeContainerButtonIcon"
                                                color="primary" icon={list} />
                                            <br />
                                            <IonLabel
                                                color={'primary'}
                                                className="homeContainerButtonLabel"
                                            >
                                                Ordenes
                                            </IonLabel>
                                        </IonCard>
                                    </IonCol>
                                    <IonCol sizeXl="1.5"></IonCol>
                                </IonRow>
                            </div>
                        </div>
                    </IonCol>
                </IonRow>
            </IonGrid>
            
            {/* <IonGrid>
                <IonRow>
                    <IonCol sizeXl="3">
                        <div className="leftSideMenu">
                            <div className="leftSideMenuData">
                                <h1>Menu</h1>
                                <IonItem button style={{ borderRadius: 30 }} onClick={() => {history.push('/users')}}>
                                    <IonIcon slot="start" icon={peopleCircle} color={'primary'} />
                                    <IonLabel color={'primary'}>
                                        <strong>Usuarios</strong>
                                    </IonLabel>
                                </IonItem>
                                <IonItem button style={{ borderRadius: 30 }} onClick={() => {history.push('/clients')}}>
                                    <IonIcon slot="start" icon={briefcase} color={'primary'} />
                                    <IonLabel color={'primary'}>
                                        <strong>Clientes</strong>
                                    </IonLabel>
                                </IonItem>
                                <IonItem button style={{ borderRadius: 30 }} onClick={() => {history.push('/work-orders')}}>
                                    <IonIcon slot="start" icon={list} color={'primary'} />
                                    <IonLabel color={'primary'}>
                                        <strong>Ordenes de Trabajo</strong>
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
                                <IonSearchbar placeholder="Buscar Cliente" onIonChange={(e: any) => {searchCliente(e.detail.value)}} />
                                {
                                    clientes.map((cliente, index) => {
                                        return (
                                            <IonItem button key={index} onClick={() => {selectCliente(cliente)}}>
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
                                {
                                    !cliente && 
                                    <p>
                                        Elija a un cliente    
                                    </p>
                                }
                                {
                                    cliente &&
                                    <div>
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol>
                                                    <div style={
                                                        {
                                                            borderRadius: 20,
                                                            borderColor: '#ccc',
                                                            borderStyle: 'solid',
                                                            borderWidth: 2,
                                                            padding: 5,
                                                            margin: 5
                                                        }
                                                    }>
                                                        <IonRow>
                                                            <IonCol size="6">
                                                                <IonLabel>
                                                                    Nombre empresa:
                                                                </IonLabel>
                                                            </IonCol>
                                                            <IonCol size="6">
                                                                <IonLabel>
                                                                    {cliente.empresa.nombre}
                                                                </IonLabel>
                                                            </IonCol>
                                                        </IonRow>
                                                        <IonRow>
                                                            <IonCol size="6">
                                                                <IonLabel>
                                                                    Run: 
                                                                </IonLabel>
                                                            </IonCol>
                                                            <IonCol size="6">
                                                                <IonLabel>
                                                                    {cliente.empresa.run}
                                                                </IonLabel>
                                                            </IonCol>
                                                        </IonRow>
                                                        <IonRow>
                                                            <IonCol size="6">
                                                                <IonLabel>
                                                                    Dirección:
                                                                </IonLabel>
                                                            </IonCol>
                                                            <IonCol size="6">
                                                                <IonLabel>
                                                                    {cliente.empresa.direccion}
                                                                </IonLabel>
                                                            </IonCol>
                                                        </IonRow>
                                                        <IonRow>
                                                            <IonCol size="6">
                                                                <IonLabel>
                                                                    Ciudad: 
                                                                </IonLabel>
                                                            </IonCol>
                                                            <IonCol size="6">
                                                                <IonLabel>
                                                                    {cliente.empresa.ciudad}
                                                                </IonLabel>
                                                            </IonCol>
                                                        </IonRow>
                                                        <IonRow>
                                                            <IonCol size="6">
                                                                <IonLabel>
                                                                    Región: 
                                                                </IonLabel>
                                                            </IonCol>
                                                            <IonCol size="6">
                                                                <IonLabel>
                                                                    {cliente.empresa.region}
                                                                </IonLabel>
                                                            </IonCol>
                                                        </IonRow>
                                                        <IonRow>
                                                            <IonCol size="6">
                                                                <IonLabel>
                                                                    Localización: 
                                                                </IonLabel>
                                                            </IonCol>
                                                            <IonCol size="6">
                                                                <IonLabel>
                                                                    {cliente.empresa.location?.lat} {cliente.empresa.location?.lng}
                                                                </IonLabel>
                                                            </IonCol>
                                                        </IonRow>
                                                    </div>
                                                </IonCol>
                                                <IonCol>
                                                    <div style={
                                                        {
                                                            borderRadius: 20,
                                                            borderColor: '#ccc',
                                                            borderStyle: 'solid',
                                                            borderWidth: 2,
                                                            padding: 5,
                                                            margin: 5
                                                        }
                                                    }>
                                                        <IonRow>
                                                            <IonCol size="6">
                                                                <IonLabel>
                                                                    Contactos: 
                                                                </IonLabel>
                                                            </IonCol>
                                                            <IonCol size="6">
                                                                {
                                                                    cliente.empresa.contactos?.map((usuario, index) => {
                                                                        console.log(usuario)
                                                                        return (
                                                                            <div key={index}>
                                                                                <IonLabel>
                                                                                    {usuario.nombre} {usuario.apellido}
                                                                                </IonLabel>
                                                                                <br />
                                                                                <a href={`tel:${usuario.telefono}`}>
                                                                                    {usuario.telefono}
                                                                                </a>
                                                                                <br />
                                                                                <a href={`mailto:${usuario.correo}`}>
                                                                                    {usuario.correo}
                                                                                </a>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </IonCol>
                                                        </IonRow>
                                                    </div>
                                                </IonCol>
                                            </IonRow>
                                            {
                                                <div style={{ width: '100%' }}>
                                                    <div style={{ width: '100%', textAlign: 'center' }}>
                                                        <h1>
                                                            Contratos
                                                        </h1>
                                                    </div>
                                                    <IonRow>
                                                        {
                                                            cliente.contratos?.map((contrato, index) => {
                                                                return (
                                                                    <IonCol key={index} size={'6'}>
                                                                        <div style={
                                                                            {
                                                                                borderRadius: 20,
                                                                                borderColor: '#ccc',
                                                                                borderStyle: 'solid',
                                                                                borderWidth: 2,
                                                                                padding: 5,
                                                                                margin: 5
                                                                            }
                                                                        }>
                                                                            <p>
                                                                                Descripción:
                                                                            </p>
                                                                            <p>
                                                                                {contrato.descripcion}
                                                                            </p>
                                                                            <p>
                                                                                Tipo de Contrato: {contrato.tipoContrato}
                                                                            </p>
                                                                        </div>
                                                                    </IonCol>
                                                                )
                                                            })
                                                        }
                                                    </IonRow>
                                                </div>
                                            }
                                        </IonGrid>
                                    </div>
                                }
                            </div>
                        </div>
                    </IonCol>
                </IonRow>
            </IonGrid> */}
        </IonContent>
    )
}

export default HomeContainer
