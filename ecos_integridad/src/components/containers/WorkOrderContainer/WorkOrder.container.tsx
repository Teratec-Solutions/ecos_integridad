import { IonButton, IonCol, IonContent, IonDatetime, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonLoading, IonModal, IonPopover, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from '@ionic/react'
import { AxiosResponse } from 'axios'
import { arrowBack } from 'ionicons/icons'
import { useContext, useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Cliente, Contrato } from '../../../interfaces/Cliente'
import { clientsRouter, templateRouter, woRouter } from '../../../router'
import { close } from 'ionicons/icons'
import './WorkOrderContainer.css'
import { getSimpleDateTime } from '../../../functions'
import { Ordenes } from '../../../interfaces/Ordenes'
import { Usuario } from '../../../interfaces/Usuario'
import { Template } from '../../../interfaces/Template'
import { UsersContext } from '../../../context/Users.context'
import { ClientsContext } from '../../../context/Clients.context'
import { AuthContext } from '../../../context/Auth.context'

const WorkOrderContainer = () => {
    const {usuario} = useContext(AuthContext)
    const {supervisores, operadores} = useContext(UsersContext)
    const {clients} = useContext(ClientsContext)
    const _id: {id: string} = useParams()
    const [ woNumber, setWoNumber ] = useState<number>()
    const [ nombreSupervisor, setSupervisor ] = useState<string>('')
    const [ nombreAsignacion, setAsignacion ] = useState<string>('')
    const [ prioridad, setPrioridad ] = useState<string>('')
    const [ fechaEjecucion, setFechaEjecucion ] = useState<Date>()
    const [ fechaTermino, setFechaTermino ] = useState<Date>()
    const [ description, setDescription ] = useState<string>('')
    const [ clienteSeleccionado, setClienteSeleccionado ] = useState<string>()
    const [ contratoSeleccionado, setContratoSeleccionado ] = useState<string>()
    const [ protocoloSeleccionado, setProtocoloSeleccionado ] = useState<string>()
    const [ protocolos, setProtocolos ] = useState<Template[]>([])
    const [ contratos, setContratos ] = useState<Contrato[]>([])
    const [ operadoresFiltrados, setOperadoresFiltrados ] = useState<Usuario[]>([])
    const [ supervisoresFiltrados, setSupervisoresFiltrados ] = useState<Usuario[]>([])
    const [ supervisorSeleccionado, setSupervisorSeleccionado ] = useState<string>('')
    const [ operadorSeleccionado, setOperadorSeleccionado ] = useState<string>('')
    const [ showLoading, setShowLoading ] = useState<boolean>(false)
    const [ contratoDeshabilitado, setContratoDeshabilitado ] = useState<boolean>(true)
    const [ supervisorOpenPopover, setSupervisorOpenPopover ] = useState<boolean>(false)
    const [ usuarioOpenPopover, setUsuarioOpenPopover ] = useState<boolean>(false)
    const [ orden, setOrden ] = useState<Ordenes>()
    const history = useHistory()
    const modalInicio = useRef<HTMLIonModalElement>(null);
    const modalTermino = useRef<HTMLIonModalElement>(null);
    useEffect(() => {
        if (operadores && supervisores) {
            setOperadoresFiltrados(operadores)
            setSupervisoresFiltrados(supervisores)
        }
    }, [supervisores, operadores])
    useEffect(() => {
        setShowLoading(true)
        init()
    }, [])
    useEffect(() => {
        if (orden) {
            orden.cliente && console.log(orden.cliente[0])
            setWoNumber(orden.nroWo)
            setPrioridad(orden.prioridad)
            setFechaEjecucion(orden.fechaInicio)
            setFechaTermino(orden.fechaTermino)
            orden.supervisor && setSupervisor(`${orden.supervisor[0].nombre} ${orden.supervisor[0].apellido1} ${orden.supervisor[0].apellido2}`)
            orden.supervisor && setSupervisorSeleccionado(orden.supervisor[0]._id)
            orden.asignado && setAsignacion(`${orden.asignado[0].nombre} ${orden.asignado[0].apellido1} ${orden.asignado[0].apellido2}`)
            orden.asignado && setOperadorSeleccionado(orden.asignado[0]._id)
            setDescription(orden.descripcion)
            setShowLoading(false)
        }
    },[orden])
    useEffect(() => {
        if (clients.length > 0 && orden) {
            if (orden.cliente)
            if (orden.cliente[0]._id)
            seleccionarCliente(orden.cliente[0]._id)
        }
    }, [clients, orden])
    useEffect(() => {
        if (contratos.length > 0 && orden) {
            console.log(contratos)
            if (orden.contrato)
            if (orden.contrato[0]._id)
            seleccionarContrato(orden.contrato[0]._id)
        }
    },[contratos, orden])
    useEffect(() => {
        if (protocolos.length > 0 && orden) {
            console.log(protocolos)
            if (orden.protocolo)
            if (orden.protocolo[0]._id)
            seleccionarProtocolo(orden.protocolo[0]._id)
        }
    },[protocolos, orden])
    const init = async () => {
        if (_id.id) {
            const res: AxiosResponse = await woRouter.getWoById(_id.id)
            const ordenResponse : Ordenes = res.data.data
            setOrden(ordenResponse)
        } else {
            const responseWO: AxiosResponse = await woRouter.getNumberWorkOrders()
            setWoNumber((responseWO.data.data.total + 1))
            setShowLoading(false)
        }
    }
    const guardarFechaEjecucion = (e: any) => {
        if (window.confirm(`Confirme la fecha ${getSimpleDateTime(e.target.value)}`)) {
            setFechaEjecucion(e.target.value)
            closeFechaEjecucion()
        }
    }
    const guardarFechaTermino = (e: any) => {
        if (window.confirm(`Confirme la fecha ${getSimpleDateTime(e.target.value)}`)) {
            setFechaTermino(e.target.value)
            closeFechaTermino()
        }
    }
    const closeFechaEjecucion = () => {
        modalInicio.current?.dismiss()
    }
    const closeFechaTermino = () => {
        modalTermino.current?.dismiss()
    }
    const buscarSupervisores = (value: string) => {
        if (value.length > 2) {
            const dataFiltered = supervisores.filter(usuario => {
                if (`${usuario.nombre?.toLocaleLowerCase()} ${usuario.apellido1?.toLocaleLowerCase()} ${usuario.apellido2?.toLocaleLowerCase()}`.match(value.toLocaleLowerCase())||`${usuario.run}`.match(value)) {
                    return usuario
                } else {
                    return null
                }
            })
            setSupervisoresFiltrados(dataFiltered)
        } else {
            setSupervisoresFiltrados(supervisores)
        }
    }
    const buscarOperadores = (value: string) => {
        if (value.length > 2) {
            const dataFiltered = operadores.filter(usuario => {
                if (`${usuario.nombre?.toLocaleLowerCase()} ${usuario.apellido1?.toLocaleLowerCase()} ${usuario.apellido2?.toLocaleLowerCase()}`.match(value.toLocaleLowerCase())||`${usuario.run}`.match(value)) {
                    return usuario
                } else {
                    return null
                }
            })
            console.log(dataFiltered)
            setOperadoresFiltrados(dataFiltered)
        } else {
            setOperadoresFiltrados(operadores)
        }
    }
    const seleccionarCliente = async (clienteId: string) => {
        setClienteSeleccionado(clienteId)
        const response = await clientsRouter.getClientById(clienteId)
        const client: Cliente = response?.data.data
        client.contratos && setContratos(client.contratos)
        if (client.contratos) {
            if (client.contratos?.length > 0) {
                setContratoDeshabilitado(false)
                console.log(client.contratos)
            } else {
                setContratoDeshabilitado(true)
                alert('Cliente no tiene contratos asignados')
            }
        }
    }
    
    const seleccionarContrato = async (contratoId: string) => {
        setContratoSeleccionado(contratoId)
        const res = await templateRouter.getTemplateByContract(contratoId)
        console.log(res)
        setProtocolos(res.data.data)
    }
    const seleccionarProtocolo = async (protocoloId: string) => {
        setProtocoloSeleccionado(protocoloId)
    }
    const selectSupervisor = (supervisor: string, supervisorNombre: string) => {
        setSupervisorSeleccionado(supervisor)
        setSupervisor(supervisorNombre)
        setSupervisorOpenPopover(false)
    }
    const selectUsuario = (usuario: string, usuarioNombre: string) => {
        setOperadorSeleccionado(usuario)
        setAsignacion(usuarioNombre)
        setUsuarioOpenPopover(false)
    }
    const guardarOrden = async () => {
        if (_id.id) {
            if (window.confirm(`¿Seguro desea guardar edición de Oreden de Trabajo N°${woNumber}?`)) {
                const editarOrden : Ordenes = {
                    _id: _id.id,
                    asignado: [{_id: operadorSeleccionado}],
                    supervisor: [{_id: supervisorSeleccionado}],
                    prioridad: prioridad,
                    lastEditedBy: usuario?._id,
                    descripcion: description,
                    fechaInicio: fechaEjecucion,
                    fechaTermino: fechaTermino,
                    cliente: [{_id: clienteSeleccionado} as Cliente],
                    contrato: [{_id: contratoSeleccionado} as Contrato],
                    protocolo: [{_id: protocoloSeleccionado} as Template],
                    nroWo: woNumber
                }
                const response : AxiosResponse = await woRouter.editOrder(editarOrden)
                console.log(response)
                if (response) {
                    setShowLoading(false)
                    history.goBack()
                }
            }
        } else {
            if (window.confirm('¿Seguro desea guardar la nueva Oreden de Trabajo?')) {
                setShowLoading(true)
                const nuevaOrden : Ordenes = {
                    asignado: [{_id: operadorSeleccionado}],
                    supervisor: [{_id: supervisorSeleccionado}],
                    prioridad: prioridad,
                    createdBy: usuario?._id,
                    descripcion: description,
                    fechaInicio: fechaEjecucion,
                    fechaTermino: fechaTermino,
                    cliente: [{_id: clienteSeleccionado} as Cliente],
                    contrato: [{_id: contratoSeleccionado} as Contrato],
                    protocolo: [{_id: protocoloSeleccionado} as Template],
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
                <IonGrid className='container-data'>
                    <IonRow>
                        <IonCol>

                        </IonCol>
                        <IonCol sizeXl='6' sizeLg='6' sizeMd='8' sizeSm='10' sizeXs='12'>
                            <IonRow>
                                <IonCol sizeXl='4' sizeLg='4' sizeMd='4' sizeSm='12' sizeXs='12'>
                                    <div className='item-container-style'>
                                        <IonItem disabled={true}>
                                            <IonLabel position={'floating'}>N° OT</IonLabel>
                                            <IonInput
                                                value={woNumber}
                                            />
                                        </IonItem>
                                    </div>
                                </IonCol>
                                <IonCol sizeXl='8' sizeLg='8' sizeMd='8' sizeSm='12' sizeXs='12'>
                                    <div className='item-container-style'>
                                        <IonItem className='item-style'>
                                            <IonLabel position={'floating'}>Prioridad</IonLabel>
                                            <IonSelect value={prioridad} onIonChange={(e:any) => { setPrioridad(e.target.value) }} interface={'popover'} className='item-select-style'>
                                                <IonSelectOption value={'Crítico'}>Crítico</IonSelectOption>
                                                <IonSelectOption value={'Urgente'}>Urgente</IonSelectOption>
                                                <IonSelectOption value={'Simple'}>Simple</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>
                                    </div>
                                </IonCol>
                                <IonCol sizeXl='6' sizeLg='6' sizeMd='6' sizeSm='12' sizeXs='12'>
                                    <div className='item-container-style'>
                                        <IonItem className='item-style' button id='open-modal-inicio'>
                                            <IonLabel style={{ paddingTop: 8, paddingBottom: 8}}>
                                                Fecha Ejecución &nbsp;
                                                {getSimpleDateTime(fechaEjecucion)}
                                            </IonLabel>
                                        </IonItem>
                                    </div>
                                </IonCol>
                                <IonCol sizeXl='6' sizeLg='6' sizeMd='6' sizeSm='12' sizeXs='12'>
                                    <div className='item-container-style'>
                                        <IonItem className='item-style' button id='open-modal-termino'>
                                            <IonLabel style={{ paddingTop: 8, paddingBottom: 8}}>
                                                Fecha Término &nbsp;
                                                {getSimpleDateTime(fechaTermino)}
                                            </IonLabel>
                                        </IonItem>
                                    </div>
                                </IonCol>
                                <IonCol sizeXl='6' sizeLg='6' sizeMd='6' sizeSm='12' sizeXs='12'>
                                    <div className='item-container-style'>
                                        <IonItem className='item-style'>
                                            <IonLabel position={'floating'}>Cliente</IonLabel>
                                            <IonSelect value={clienteSeleccionado} onIonChange={(e: any) => {seleccionarCliente(e.target.value)}} interface={'popover'} className='item-select-style'>
                                                {
                                                    clients.map((cliente, index) => {
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
                                        <IonItem className='item-style' disabled={contratoDeshabilitado}>
                                            <IonLabel position={'floating'}>Contrato</IonLabel>
                                            <IonSelect value={contratoSeleccionado} onIonChange={(e: any) => {seleccionarContrato(e.target.value)}} interface={'popover'} className='item-select-style'>
                                                {
                                                    contratos.map((contrato, index) => {
                                                        return (
                                                            <IonSelectOption key={index} value={contrato._id}>{contrato.descripcion}</IonSelectOption>
                                                        )
                                                    })
                                                }
                                            </IonSelect>
                                        </IonItem>
                                    </div>
                                </IonCol>
                                <IonCol sizeXl='12' sizeLg='12' sizeMd='12' sizeSm='12' sizeXs='12'>
                                    <div className='item-container-style'>
                                        <IonItem className='item-style' disabled={contratoDeshabilitado}>
                                            <IonLabel position={'floating'}>Protocolo</IonLabel>
                                            <IonSelect value={protocoloSeleccionado} onIonChange={(e: any) => {seleccionarProtocolo(e.target.value)}} interface={'popover'} className='item-select-style'>
                                                {
                                                    protocolos.map((protocolo, index) => {
                                                        return (
                                                            <IonSelectOption key={index} value={protocolo._id}>{protocolo.nombrePlanilla}</IonSelectOption>
                                                        )
                                                    })
                                                }
                                            </IonSelect>
                                        </IonItem>
                                    </div>
                                </IonCol>
                                <IonCol sizeXl='6' sizeLg='6' sizeMd='6' sizeSm='12' sizeXs='12'>
                                    <div className='item-container-style'>
                                        <IonItem id="supervisor-trigger" button className='item-style' onClick={() => {setSupervisorOpenPopover(true)}}>
                                            <IonLabel style={{ paddingTop: 8, paddingBottom: 8}}>Supervisor {nombreSupervisor}</IonLabel>
                                        </IonItem>
                                        <IonPopover isOpen={supervisorOpenPopover} backdropDismiss trigger="supervisor-trigger" size='cover' alignment="start">
                                            <IonContent class="ion-padding" style={{ minWidth: 300 }}>
                                                <IonSearchbar onIonChange={(e: any) => { buscarSupervisores(e.target.value) }} />
                                                {
                                                    supervisoresFiltrados.map((supervisor, index) => {
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
                                        <IonItem id="usuario-trigger" button className='item-style' onClick={() => {setUsuarioOpenPopover(true)}}>
                                            <IonLabel style={{ paddingTop: 8, paddingBottom: 8}}>Asignación {nombreAsignacion}</IonLabel>
                                        </IonItem>
                                        <IonPopover isOpen={usuarioOpenPopover} backdropDismiss trigger="usuario-trigger" size='cover' alignment="start">
                                            <IonContent class="ion-padding" style={{ minWidth: 300 }}>
                                                <IonSearchbar onIonChange={(e: any) => { buscarOperadores(e.target.value) }} />
                                                {
                                                    operadoresFiltrados.map((usuario, index) => {
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
                                                rows={8}
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
                                        {(_id.id ? 'Editar ' : 'Crear ')} Orden
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
                trigger='open-modal-inicio'
                ref={modalInicio}
            >
                <IonToolbar>
                    <IonTitle>
                        Seleccione Fecha de Inicio Programado
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
            <IonModal
                trigger='open-modal-termino'
                ref={modalTermino}
            >
                <IonToolbar>
                    <IonTitle>
                        Seleccione Fecha de Término Programado
                    </IonTitle>
                    <IonButton onClick={() => closeFechaTermino()} fill={'clear'} slot={'end'}>
                        <IonIcon icon={close} />
                    </IonButton>
                </IonToolbar>
                <IonDatetime
                    onIonChange={(e: any) => {guardarFechaTermino(e)}}
                    firstDayOfWeek={1}
                    id="datetime" 
                    style={{ margin: 'auto', borderColor: '#ccc', borderStyle: 'solid', borderWidth: 1, borderRadius: 20 }}
                />
            </IonModal>
        </IonContent>
    )
}

export default WorkOrderContainer
