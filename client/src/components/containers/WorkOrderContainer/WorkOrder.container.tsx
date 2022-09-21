import { IonButton, IonCol, IonContent, IonDatetime, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonLoading, IonModal, IonPopover, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from '@ionic/react'
import { AxiosResponse } from 'axios'
import { arrowBack } from 'ionicons/icons'
import { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { Cliente, Contrato } from '../../../interfaces/Cliente'
import { clientsRouter, usersRouter, woRouter } from '../../../router'
import { close } from 'ionicons/icons'
import './WorkOrderContainer.css'
import { getSimpleDateTime } from '../../../functions'
import { Ordenes } from '../../../interfaces/Ordenes'
import { Usuario } from '../../../interfaces/Usuario'

const WorkOrderContainer = () => {
    const [ woNumber, setWoNumber ] = useState<string>('')
    const [ nombreSupervisor, setSupervisor ] = useState<string>('')
    const [ nombreAsignacion, setAsignacion ] = useState<string>('')
    const [ prioridad, setPrioridad ] = useState<string>('')
    const [ fechaEjecucion, setFechaEjecucion ] = useState<Date>()
    const [ openModalFechaEjecucion, setOpenModalFechaEjecucion ] = useState<boolean>(false)
    const [ description, setDescription ] = useState<string>('')
    const [ clientes, setClientes ] = useState<Cliente[]>([])
    const [ clienteSeleccionado, setClienteSeleccionado ] = useState<string>('')
    const [ contratoSeleccionado, setContratoSeleccionado ] = useState<string>()
    const [ contratos, setContratos ] = useState<Contrato[]>([])
    const [ supervisores, setSupervisores ] = useState<Usuario[]>([])
    const [ supervisoresCache, setSupervisoresCache ] = useState<Usuario[]>([])
    const [ usuarios, setUsuarios ] = useState<Usuario[]>([])
    const [ usuariosCache, setUsuariosCache ] = useState<Usuario[]>([])
    const [ supervisorSeleccionado, setSupervisorSeleccionado ] = useState<string>('')
    const [ operadorSeleccionado, setOperadorSeleccionado ] = useState<string>('')
    const [ userData, setUserData ] = useState<Usuario>()
    const [ showLoading, setShowLoading ] = useState<boolean>(false)
    const history = useHistory()
    const modal = useRef<HTMLIonModalElement>(null);
    useEffect(() => {
        setShowLoading(true)
        init()
    }, [])
    const init = async () => {
        const response: AxiosResponse = await clientsRouter.getClients()
        setClientes(response.data.data)
        const responseWO: AxiosResponse = await woRouter.getNumberWorkOrders()
        setWoNumber((responseWO.data.data.total + 1))
        const responseSupervisores: AxiosResponse = await usersRouter.getSupervisores()
        setSupervisores(responseSupervisores.data.data)
        setSupervisoresCache(responseSupervisores.data.data)
        const responseUsuarios: AxiosResponse = await usersRouter.getOperadores()
        setUsuarios(responseUsuarios.data.data)
        setUsuariosCache(responseUsuarios.data.data)
        const u: Usuario = JSON.parse(window.localStorage.getItem('usuario')|| '{}')
        setUserData(u)
        setShowLoading(false)
    }
    const guardarFechaEjecucion = (e: any) => {
        if (window.confirm(`Confirme la fecha ${getSimpleDateTime(e.target.value)}`)) {
            setFechaEjecucion(e.target.value)
            closeFechaEjecucion()
        }
    }
    const closeFechaEjecucion = () => {
        modal.current?.dismiss()
    }
    const buscarSupervisores = (value: string) => {
        if (value.length > 2) {
            const dataFiltered = supervisoresCache.filter(usuario => {
                if (`${usuario.nombre} ${usuario.apellido1} ${usuario.apellido2}`.match(value)||`${usuario.run}`.match(value)) {
                    return usuario
                } else {
                    return null
                }
            })
            setSupervisores(dataFiltered)
        } else {
            setSupervisores(supervisoresCache)
        }
    }
    const buscarUsuarios = (value: string) => {
        if (value.length > 2) {
            const dataFiltered = usuariosCache.filter(usuario => {
                if (`${usuario.nombre} ${usuario.apellido1} ${usuario.apellido2}`.match(value)||`${usuario.run}`.match(value)) {
                    return usuario
                } else {
                    return null
                }
            })
            setUsuarios(dataFiltered)
        } else {
            setUsuarios(usuariosCache)
        }
    }
    const seleccionarCliente = (_id: string) => {
        setClienteSeleccionado(_id)
    }
    const selectSupervisor = (supervisor: string, supervisorNombre: string) => {
        setSupervisorSeleccionado(supervisor)
        setSupervisor(supervisorNombre)
    }
    const selectUsuario = (usuario: string, usuarioNombre: string) => {
        setOperadorSeleccionado(usuario)
        setAsignacion(usuarioNombre)
    }
    const guardarOrden = async () => {
        if (window.confirm('¿Seguro desea guardar la nueva Oreden de Trabajo?')) {
            setShowLoading(true)
            const nuevaOrden : Ordenes = {
                asignado: [{_id: operadorSeleccionado}],
                supervisor: [{_id: supervisorSeleccionado}],
                prioridad: prioridad,
                createdBy: userData?._id,
                descripcion: description,
                fechaInicio: fechaEjecucion,
                cliente: [{_id: clienteSeleccionado} as Cliente],
                contrato: [{_id: contratoSeleccionado} as Contrato]
            }
            console.log(nuevaOrden)
            const response : AxiosResponse = await woRouter.saveOrder(nuevaOrden)
            console.log(response)
            if (response) {
                setShowLoading(false)
                history.goBack()
            }
        }
    }
    return (
        <IonContent className='bg-content'>
            <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                /* onDidDismiss={() => setShowLoading(false)} */
                message={'Cargando datos...'}
                /* duration={5000} */
            />
            <div className='titles'>
                <IonToolbar style={{ borderRadius: 10 }}>
                    <IonButton slot='start' fill={'clear'} onClick={() => {history.goBack()}}>
                        <IonIcon icon={arrowBack} />
                    </IonButton>
                    <IonTitle>
                        Orden de Trabajo
                    </IonTitle>
                </IonToolbar>
            </div>
            <div className='bg-content-users'>
                <IonGrid>
                    <IonRow>
                        <IonCol>

                        </IonCol>
                        <IonCol sizeXl='6' sizeLg='6' sizeMd='8' sizeSm='10' sizeXs='12'>
                            <IonRow>
                                <IonCol sizeXl='2' sizeLg='2' sizeMd='6' sizeSm='12' sizeXs='12'>
                                    <div className='item-container-style'>
                                        <IonItem disabled={true}>
                                            <IonLabel position={'floating'}>N° OT</IonLabel>
                                            <IonInput
                                                value={woNumber}
                                            />
                                        </IonItem>
                                    </div>
                                </IonCol>
                                <IonCol sizeXl='4' sizeLg='4' sizeMd='6' sizeSm='12' sizeXs='12'>
                                    <div className='item-container-style'>
                                        <IonItem className='item-style'>
                                            <IonLabel position={'floating'}>Prioridad</IonLabel>
                                            <IonSelect onIonChange={(e:any) => { setPrioridad(e.target.value) }} interface={'popover'} className='item-select-style'>
                                                <IonSelectOption>Crítico</IonSelectOption>
                                                <IonSelectOption>Urgente</IonSelectOption>
                                                <IonSelectOption>Simple</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>
                                    </div>
                                </IonCol>
                                <IonCol sizeXl='6' sizeLg='6' sizeMd='6' sizeSm='12' sizeXs='12'>
                                    <div className='item-container-style'>
                                        <IonItem className='item-style' button id='open-modal'>
                                            <IonLabel style={{ paddingTop: 8, paddingBottom: 8}}>
                                                Fecha Ejecución &nbsp;
                                                {getSimpleDateTime(fechaEjecucion)}
                                            </IonLabel>
                                        </IonItem>
                                    </div>
                                </IonCol>
                                <IonCol sizeXl='6' sizeLg='6' sizeMd='6' sizeSm='12' sizeXs='12'>
                                    <div className='item-container-style'>
                                        <IonItem className='item-style'>
                                            <IonLabel position={'floating'}>Cliente</IonLabel>
                                            <IonSelect onIonChange={(e: any) => {seleccionarCliente(e.target.value)}} interface={'popover'} className='item-select-style'>
                                                {
                                                    clientes.map((cliente, index) => {
                                                        return (
                                                            <IonSelectOption key={index} value={cliente._id}>{cliente.empresa ? cliente.empresa.nombre : ''}</IonSelectOption>
                                                        )
                                                    })
                                                }
                                            </IonSelect>
                                        </IonItem>
                                    </div>
                                </IonCol>
                                <IonCol sizeXl='6' sizeLg='6' sizeMd='6' sizeSm='12' sizeXs='12'>
                                    <div className='item-container-style'>
                                        <IonItem className='item-style'>
                                            <IonLabel position={'floating'}>Contrato</IonLabel>
                                            <IonSelect interface={'popover'} className='item-select-style'>
                                                <IonSelectOption>Contrato 1</IonSelectOption>
                                                <IonSelectOption>Contrato 2</IonSelectOption>
                                                <IonSelectOption>Contrato 3</IonSelectOption>
                                                <IonSelectOption>Contrato 4</IonSelectOption>
                                                <IonSelectOption>Contrato 5</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>
                                    </div>
                                </IonCol>
                                <IonCol sizeXl='6' sizeLg='6' sizeMd='6' sizeSm='12' sizeXs='12'>
                                    <div className='item-container-style'>
                                        <IonItem id="supervisor-trigger" button className='item-style'>
                                            <IonLabel style={{ paddingTop: 8, paddingBottom: 8}}>Supervisor {nombreSupervisor}</IonLabel>
                                        </IonItem>
                                        <IonPopover backdropDismiss dismissOnSelect trigger="supervisor-trigger" size='cover' alignment="start">
                                            <IonContent class="ion-padding" style={{ minWidth: 300 }}>
                                                <IonSearchbar onIonChange={(e: any) => { buscarSupervisores(e.target.value) }} />
                                                {
                                                    supervisores.map((supervisor, index) => {
                                                        return (
                                                            <IonItem key={index} button onClick={() => { selectSupervisor(supervisor._id, `${supervisor.nombre} ${supervisor.apellido1}`) }}>
                                                                {supervisor.nombre} {supervisor.apellido1}
                                                            </IonItem>
                                                        )
                                                    })
                                                }
                                            </IonContent>
                                        </IonPopover>
                                    </div>
                                </IonCol>
                                <IonCol sizeXl='6' sizeLg='6' sizeMd='6' sizeSm='12' sizeXs='12'>
                                    <div className='item-container-style'>
                                        <IonItem id="usuario-trigger" button className='item-style'>
                                            <IonLabel style={{ paddingTop: 8, paddingBottom: 8}}>Asignación {nombreAsignacion}</IonLabel>
                                        </IonItem>
                                        <IonPopover backdropDismiss dismissOnSelect trigger="usuario-trigger" size='cover' alignment="start">
                                            <IonContent class="ion-padding" style={{ minWidth: 300 }}>
                                                <IonSearchbar onIonChange={(e: any) => { buscarUsuarios(e.target.value) }} />
                                                {
                                                    usuarios.map((usuario, index) => {
                                                        return (
                                                            <IonItem key={index} button onClick={() => { selectUsuario(usuario._id, `${usuario.nombre} ${usuario.apellido1}`) }}>
                                                                {usuario.nombre} {usuario.apellido1}
                                                            </IonItem>
                                                        )
                                                    })
                                                }
                                            </IonContent>
                                        </IonPopover>
                                    </div>
                                </IonCol>
                                <IonCol sizeXl='12' sizeLg='12' sizeMd='12' sizeSm='12' sizeXs='12'>
                                    <div className='item-container-style'>
                                        <IonItem className='item-style'>
                                            <IonTextarea
                                                placeholder='Descipción...'
                                                rows={10}
                                                value={description}
                                                onIonChange={(e: any) => {setDescription(e.target.value)}}
                                            />
                                        </IonItem>
                                    </div>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonButton color={'danger'} expand={'block'} onClick={() => history.goBack()}>
                                        Cancelar
                                    </IonButton>
                                </IonCol>
                                <IonCol>
                                    <IonButton color={'primary'} expand={'block'} onClick={() => {guardarOrden()}}>
                                        Crear Orden
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonCol>
                        <IonCol>

                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>
            <IonModal
                trigger='open-modal'
                ref={modal}
            >
                <IonToolbar>
                    <IonTitle>
                        Seleccione Fecha de Ejecución
                    </IonTitle>
                    <IonButton onClick={() => closeFechaEjecucion()} fill={'clear'} slot={'end'}>
                        <IonIcon icon={close} />
                    </IonButton>
                </IonToolbar>
                <IonDatetime
                    onIonChange={(e: any) => {guardarFechaEjecucion(e)}}
                    firstDayOfWeek={1}
                    id="datetime" 
                    style={{ margin: 'auto', borderColor: '#ccc', borderStyle: 'solid', borderWidth: 1, borderRadius: 20 }}
                />
            </IonModal>
        </IonContent>
    )
}

export default WorkOrderContainer
