import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonLoading, IonRow, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToast, IonToolbar } from "@ionic/react"
import { add, arrowBack, close, eye, save, trash, chevronForward } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { Cliente, Contrato } from "../../../interfaces/Cliente"
import { GrupoTareas, Informacion, Template, Tarea } from "../../../interfaces/Template"
import { clientsRouter, templateRouter } from "../../../router"
import { ClientsSelectionModal, ContractsSelectionModal, TemplatePreviewModal } from "../../modals"

const TemplatesContainer = () => {
    const [planillas, setPlanillas] = useState<Template[]>([])
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [contratos, setContratos] = useState<Contrato[]>([])
    const [contrato, setContrato] = useState<Contrato>()
    const [cliente, setCliente] = useState<Cliente>()
    const [planilla, setPlanilla] = useState<Template>()
    const [informaciones, setInformaciones] = useState<Informacion[]>([])
    const [gruposTareas, setGruposTareas] = useState<GrupoTareas[]>([])
    const [tareas, setTareas] = useState<Tarea[]>([])
    const [showToast, setShowToast] = useState(false)
    const [messageToast, setMessageToast] = useState('')
    const [indexPlanilla, setIndexPlanilla] = useState(0)
    const [indexGrupo, setIndexGrupo] = useState(0)
    const [grupoSelected, setGrupoSelected] = useState(false)
    const [showLoading, setShowLoading] = useState(false)
    const [enEspera, setEnEspera] = useState(false)
    const [requiereActualizar, setRequiereActualizar] = useState(false)
    const [openPreview, setOpenPreview] = useState(false)
    const [openClientSelection, setOpenClientSelection] = useState(false)
    const [openContractsSelection, setOpenContractsSelection] = useState(false)
    const history = useHistory()

    useEffect(() => {
      init()
    }, [])
    
    useEffect(() => {
        const planillasCache = [...planillas]
        const gruposTareasCache = gruposTareas
        if (planillasCache.length > 0) {
            planillasCache[indexPlanilla].informacion = informaciones
            planillasCache[indexPlanilla].contenido = gruposTareas
        }
        if (gruposTareasCache.length > 0) {
            if (gruposTareasCache[indexGrupo]) {
                if (tareas.length > 0) {
                    gruposTareasCache[indexGrupo].tareas = tareas
                    planillasCache[indexPlanilla].contenido = gruposTareasCache
                    setPlanilla(planillasCache[indexPlanilla])
                    setPlanillas(planillasCache)
                } else {
                    gruposTareasCache[indexGrupo].tareas = []
                    planillasCache[indexPlanilla].contenido = gruposTareasCache
                    setPlanilla(planillasCache[indexPlanilla])
                    setPlanillas(planillasCache)
                }
            }
        }
        setPlanillas(planillasCache)
    }, [informaciones, gruposTareas, tareas])

    useEffect(() => {

    }, [planillas])
 
    const init = async () => {
        const response = await templateRouter.getTemplates()
        const planillasResponse: Template[] = response.data.data
        const responseClientes = await clientsRouter.getClients()
        const clientesResponse: Cliente[] = responseClientes.data.data
        console.log(planillasResponse)
        setPlanillas(planillasResponse)
        setClientes(clientesResponse)
    }

    const nuevaPlanilla = async () => {
        setEnEspera(true)
        const planilla = {
            nombrePlanilla: 'Sin nombre ' + (planillas.length + 1),
            informacion: [],
            contenido: [],
            responsablesInternos: [],
            responsablesExternos: [],
            seleccionado: false,
            contrato: [],
            cliente: []
        } as Template
        const response = await templateRouter.createTemplate(planilla)
        const planillaRespuesta: Template = response.data.data
        if (planillaRespuesta) {
            setMessageToast(response.data.message)
            setPlanillas(planillas => [...planillas, planilla])
            setShowToast(true)
            setEnEspera(false)
        }
    }

    const borrarPlanilla = async (planilla: Template) => {
        if (window.confirm(`Confirme que la planilla nombre ${planilla?.nombrePlanilla} será borrada. No podrá reponer la información eliminada.`)) {
            if (planilla) {
                if (planilla?._id) {
                    const response = await templateRouter.deleteTemplate(planilla._id)
                    if (response) {
                        init()
                        setPlanilla(undefined)
                    }
                }
            }
        }
    }

    const actualizar = async (p?: Template) => {
        setShowLoading(true)
        if (planilla) {
            planilla.contenido = gruposTareas
            console.log(planilla)
            const response = await templateRouter.saveTemplate(planilla)
            const planillasCache = [...planillas]
            planillasCache[indexPlanilla] = planilla
            setPlanillas(planillasCache)
            setShowLoading(false)
            setRequiereActualizar(false)
        }
    }

    const actualizarTodo = () => {
        setShowLoading(true)
        planillas.forEach(async (planilla, index) => {
            const response = await templateRouter.saveTemplate(planilla)
            if (index === (planillas.length - 1)) {
                setShowLoading(false)
                setRequiereActualizar(false)
            }
        })
    }

    const seleccionarPlanilla = ({ planilla, index }: { planilla?: Template; index: number }) => {
        if (requiereActualizar) {
            alert('Actualice planilla de protocolo')
        } else {
            const gruposTareasCache = [...gruposTareas]
            gruposTareasCache.map((grupoTareas, i) => {
                grupoTareas.seleccionado = false
            })
            setTareas([])
            setGrupoSelected(false)
            setIndexPlanilla(index)
            planillas.map((planilla) => {
                planilla.seleccionado = false
            })
            if (planilla) {
                setPlanilla(planilla)
                planilla.seleccionado = true
                setPlanillas(planillas)
                setPlanilla(planilla)
                setInformaciones(planilla.informacion)
                setGruposTareas(planilla.contenido)
                if (planilla.cliente[0]) {
                    setCliente(planilla.cliente[0])
                    if (planilla.contrato[0]) {
                        setContrato(planilla.contrato[0])
                    } else {
                        setContrato(undefined)
                    }
                } else {
                    setCliente(undefined)
                    setContrato(undefined)
                }
                if (planilla.contenido[0]) {
                    setTareas(planilla.contenido[0].tareas)
                } else {
                    setTareas([])
                }
            }
        }
    }

    const agregarInformacion = () => {
        setRequiereActualizar(true)
        const informacionesCache = [...informaciones]
        informacionesCache.push({
            nombreDato: (`Ingrese nombre dato ${informacionesCache.length + 1}`),
            tipoDato: 'texto'
        })
        setInformaciones(informacionesCache)
    }

    const agregarGrupoDeTareas = () => {
        setRequiereActualizar(true)
        const gruposTareasCache = [...gruposTareas]
        gruposTareasCache.push({
            id: Date.now(),
            titulo: (`Nombre de Grupo ${gruposTareasCache.length + 1}`),
            tareas: [],
            totalRespuestas: 1,
            seleccionado: false,
            elementos: [{
                descripcion: ''
            }]
        })
        setGruposTareas(gruposTareasCache)
    }

    const agregarTareas = () => {
        setRequiereActualizar(true)
        const tareasCache = [...tareas]
        tareasCache.push({
            id: Date.now(),
            observaciones: '',
            nroTarea: (tareas.length + 1),
            imagenes: [],
            respuestas: [],
            descripcionTarea: ''
        })
        const gruposTareasCache = gruposTareas
        gruposTareasCache[indexGrupo].tareas = tareasCache
        setGruposTareas(gruposTareasCache)
        setTareas(tareasCache)
    }

    const actualizarPlanilla = (planilla: Template, index: number) => {
        const planillasCache = [...planillas]
        planillasCache[index] = planilla
        setPlanillas(planillasCache)
    }

    const cambiarNombrePlanilla = (value: string) => {
        if (planilla) {
            const planillaCache = planilla
            planillaCache.nombrePlanilla = value
            actualizarPlanilla(planillaCache, indexPlanilla)
        }
    }

    const cambiarNombreDelDatoInformacion = (value: string, index: number) => {
        const informacionesCache = [...informaciones]
        informacionesCache[index].nombreDato = value
        setInformaciones(informacionesCache)
    }

    const cambiarTipoDeDatoInformacion = (value: string, index: number) => {
        const informacionesCache = [...informaciones]
        informacionesCache[index].tipoDato = value
        setInformaciones(informacionesCache)
    }


    const cambiarNombreDeGrupo = (value: string, index: number) => {
        const gruposTareasCache = [...gruposTareas]
        gruposTareasCache[index].titulo = value
        setGruposTareas(gruposTareasCache)
    }

    const seleccionarNumeroRespuestas = (value: number | undefined, index: number) => {
        if (value) {
            const gruposTareasCache = [...gruposTareas]
            const elementosExistentes = gruposTareasCache[index].elementos
            if (elementosExistentes) {
                if ((elementosExistentes.length > value)&&(window.confirm('Confirme que desea eliminar elementos'))) {
                    gruposTareasCache[index].totalRespuestas = value
                    gruposTareasCache[index].elementos = elementosExistentes.splice(0, value)
                    setGruposTareas(gruposTareasCache)
                } else {
                    for ( let i = 0; i < value; i++) {
                        if (i > (elementosExistentes.length - 1)) {
                            elementosExistentes.push({
                                descripcion: ''
                            })
                        }
                    }
                    gruposTareasCache[index].totalRespuestas = value
                    gruposTareasCache[index].elementos = elementosExistentes
                    setGruposTareas(gruposTareasCache)
                }
            }
        }
    }

    const eliminarElemento = (index: number, number: number) => {
        const gruposTareasCache = [...gruposTareas]
        const elementosExistentes = gruposTareasCache[index].elementos
        if (elementosExistentes) {
            const res = elementosExistentes.filter((e, i) => {
                if (number === i) {
                    return null
                } else {
                    return e
                }
            })
            gruposTareasCache[index].elementos = res
            gruposTareasCache[index].totalRespuestas = gruposTareasCache[index].elementos?.length
            setGruposTareas(gruposTareasCache)
        }
    }

    const seleccionarGrupoTareas = (grupo: GrupoTareas, index: number) => {
        const gruposTareasCache = [...gruposTareas]
        const tareasCache = [...grupo.tareas]
        gruposTareasCache.map((grupoTareas, i) => {
            if (grupoTareas === grupo) {
                grupoTareas.seleccionado = true
            } else {
                grupoTareas.seleccionado = false
            }
        })
        setGruposTareas(gruposTareasCache)
        setTareas(tareasCache)
        setIndexGrupo(index)
        setGrupoSelected(true)
    }

    const cambiarDescripcionTarea = (value: string, index: number) => {
        const tareasCache = [...tareas]
        tareasCache[index].descripcionTarea = value
        setTareas(tareasCache)
    }

    const modificarDescripcionElemento = (value: string, index: number) => {
        const gruposTareasCache = [...gruposTareas]
        const elementosCache = gruposTareasCache[indexGrupo].elementos
        if (elementosCache)
        if (elementosCache?.length > 0) {
            elementosCache[index].descripcion = value
        }
        gruposTareasCache[indexGrupo].elementos = elementosCache
        setGruposTareas(gruposTareasCache)
    }

    const quitarInformacion = (index: number) => {
        setRequiereActualizar(true)
        if (window.confirm(`Confirme será borrada. No podrá reponer la información eliminada.`)) {
            const informacionesCache = [...informaciones]
            informacionesCache.splice(index, 1)
            setInformaciones(informacionesCache)
        }
    }

    const quitarGrupo = (index: number) => {
        setRequiereActualizar(true)
        if (window.confirm(`Confirme la eliminación del grupo.`)) {
            setTareas([])
            setGrupoSelected(false)
            const gruposTareasCache = [...gruposTareas]
            gruposTareasCache.splice(index, 1)
            setGruposTareas(gruposTareasCache)
        }
    }

    const quitarTarea = (index: number) => {
        setRequiereActualizar(true)
        if (window.confirm(`Confirme será borrada. No podrá reponer la información eliminada.`)) {
            const tareasCache = [...tareas]
            tareasCache.splice(index, 1)
            setTareas(tareasCache)
        }
    }

    const closeModalPreview = () => {
        setOpenPreview(false)
    }

    const clienteSeleccionado = (cliente: Cliente) => {
        setContrato(undefined)
        setOpenClientSelection(false)
        setCliente(cliente)
        const planillasCache = [...planillas]
        planillasCache[indexPlanilla].cliente = [{_id: cliente._id} as Cliente]
        setPlanillas(planillasCache)
        if (cliente.contratos) {
            setContratos(cliente.contratos)
        } else {
            setContratos([])
        }
    }

    const closeClientsSelectionModal = () => {
        setOpenClientSelection(false)
    }

    const closeConctractSelectionModal = () => {
        setOpenContractsSelection(false)
    }

    const contratoSeleccionado = (contrato: Contrato) => {
        const planillasCache = [...planillas]
        planillasCache[indexPlanilla].contrato = [{_id: contrato._id} as Contrato]
        setPlanillas(planillasCache)
        setOpenContractsSelection(false)
        setContrato(contrato)
    }
    
    return (
        <IonContent className="bg-content">
            <ClientsSelectionModal
                setCliente={clienteSeleccionado}
                open={openClientSelection}
                clientes={clientes}
                close={closeClientsSelectionModal}
            />
            <ContractsSelectionModal
                setContrato={contratoSeleccionado}
                open={openContractsSelection}
                contratos={contratos}
                close={closeConctractSelectionModal}
            />
            <TemplatePreviewModal
                isOpen={openPreview}
                closeModal={closeModalPreview}
                planilla={planilla}
            />
            <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                message={'Please wait...'}
            />
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={messageToast}
                duration={1500}
            />
            <div className="titles">
                <IonToolbar style={{ borderRadius: 10 }}>
                    <IonButton slot="start" fill={'clear'} onClick={() => {
                        if (requiereActualizar) {
                            alert('Actualice la planilla')
                        } else {
                            history.goBack()
                        }
                    }}>
                        <IonIcon icon={arrowBack} />
                    </IonButton>
                    <IonTitle>
                        Planillas de Protocolos
                    </IonTitle>
                    <IonButton slot="end" onClick={() => { actualizarTodo() }}>
                        <IonIcon icon={save} style={{ marginRight: 10 }}/> Guardar Todo
                    </IonButton>
                </IonToolbar>
            </div>
            <div className="bg-content-wo menu-wo">
                <IonGrid>
                    <IonRow>
                        <IonCol sizeXl="2">
                            <div className="lista-contenedor">
                                <IonToolbar>
                                    <IonTitle slot="start" style={{ fontSize: 16 }}>Lista de protocolos</IonTitle>
                                    <IonButtons slot="end">
                                        <IonButton disabled={enEspera} onClick={() => { nuevaPlanilla() }} shape={'round'} title={'Nuevo Protocolo'}>
                                            <IonIcon icon={add} />
                                        </IonButton>
                                    </IonButtons>
                                </IonToolbar>
                                {
                                    planillas.length === 0
                                    &&
                                    <div className="item-lista-planillas">
                                        Sin protocolos ingresados
                                    </div>
                                }
                                <div className="lista-planillas-contenedor">
                                    {
                                        planillas.map((planilla, index) => {
                                            return (
                                                <IonItem disabled={planilla.seleccionado} button key={index} shape={'round'} onClick={() => {seleccionarPlanilla({ planilla, index })}}>
                                                    <IonLabel style={{ margin: 0, fontSize: 14 }} >
                                                        {planilla.nombrePlanilla}
                                                    </IonLabel>
                                                </IonItem>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </IonCol>
                        <IonCol>
                            <div className="lista-contenedor">
                                {planilla
                                ? 
                                <div className="contenedor-planilla">
                                    <div className="input-contenedor-planilla">
                                        <IonToolbar>
                                            <IonItem slot={'start'}>
                                                <IonLabel position={'floating'}>
                                                    Nombre de Protocolo
                                                </IonLabel>
                                                <IonInput onIonInput={() => {setRequiereActualizar(true)}} className="input-planilla" value={planilla.nombrePlanilla} onIonChange={(e: any) => { cambiarNombrePlanilla(e.target.value) }} />
                                            </IonItem>
                                            <IonItem slot={'start'} style={{ width: 200 }} button onClick={() => { setOpenClientSelection(true) }}>
                                                <IonLabel style={{ color: cliente ? '#000' : '#ccc' }}>{cliente ? (cliente.empresa && cliente.empresa.nombre) : 'Seleccione Cliente'}</IonLabel>
                                            </IonItem>
                                            <IonItem slot={'start'} style={{ width: 200 }} button onClick={() => { setOpenContractsSelection(true) }}>
                                                <IonLabel style={{ color: contrato ? '#000' : '#ccc' }}>{contrato ? contrato?.descripcion : 'Seleccione Contrato'}</IonLabel>
                                            </IonItem>
                                            <IonButtons slot={'end'}>
                                                <IonButton title="Vista Previa de Protocolo" onClick={() => { setOpenPreview(true) }}>
                                                    <IonIcon color={'primary'} icon={eye}/>
                                                </IonButton>
                                                <IonButton title="Guardar Protocolo" onClick={() => { actualizar() }}>
                                                    <IonIcon color={'primary'} icon={save}/>
                                                </IonButton>
                                                <IonButton title="Eliminar Protocolo" onClick={() => { borrarPlanilla(planilla) }}>
                                                    <IonIcon color={'danger'} icon={trash}/>
                                                </IonButton>
                                            </IonButtons>
                                        </IonToolbar>
                                    </div>
                                    <IonRow>
                                        <IonCol sizeXl="3.5">
                                            <div className="input-contenedor-planilla margin-top-10 height-info-list">
                                                <IonItem button lines={'none'} onClick={() => { agregarInformacion() }}>
                                                    <IonIcon icon={add} slot={'start'}/>
                                                    <IonLabel>
                                                        Agregar Información
                                                    </IonLabel>
                                                    <IonLabel slot={'end'}>
                                                        Total: {informaciones.length}
                                                    </IonLabel>
                                                </IonItem>
                                                <div className="height-info-list-detail">
                                                {
                                                    informaciones.map((informacion, i) => {
                                                        return (
                                                            <IonCard key={i}>
                                                                <IonItem lines={'none'}>
                                                                    <IonLabel position={'floating'}>
                                                                        Nombre de dato
                                                                    </IonLabel>
                                                                    <IonInput
                                                                        onIonInput={() => {setRequiereActualizar(true)}}
                                                                        type={'text'}
                                                                        onIonChange={(e: any) => { cambiarNombreDelDatoInformacion(e.target.value, i) }}
                                                                        value={informacion.nombreDato}
                                                                    />
                                                                    <IonButton fill={'clear'} shape={'round'} slot={'end'} onClick={() => { quitarInformacion(i) }} >
                                                                        <IonIcon icon={close} />
                                                                    </IonButton>
                                                                </IonItem>
                                                                <IonItem>
                                                                    <IonLabel>
                                                                        Tipo de dato
                                                                    </IonLabel>
                                                                    <IonSelect interface={'popover'} value={informacion.tipoDato} onIonChange={(e: any) => { cambiarTipoDeDatoInformacion(e.target.value, i) }}>
                                                                        <IonSelectOption value={'texto'}>Texto</IonSelectOption>
                                                                        <IonSelectOption value={'numero'}>Número</IonSelectOption>
                                                                        <IonSelectOption value={'buleano'}>Buleano</IonSelectOption>
                                                                        <IonSelectOption value={'localizacion'}>Localización</IonSelectOption>
                                                                    </IonSelect>
                                                                </IonItem>
                                                            </IonCard>
                                                        )
                                                    })
                                                }
                                                </div>
                                            </div>
                                        </IonCol>
                                        <IonCol size="3.5">
                                            <div className="input-contenedor-planilla margin-top-10 height-grupo-list">
                                                <IonItem button lines={'none'} onClick={() => { agregarGrupoDeTareas() }}>
                                                    <IonIcon icon={add} slot={'start'}/>
                                                    <IonLabel>
                                                        Agregar Grupo
                                                    </IonLabel>
                                                    <IonLabel slot={'end'}>
                                                        Total: {gruposTareas.length}
                                                    </IonLabel>
                                                </IonItem>
                                                <div className="height-grupo-list-detail">
                                                {
                                                    gruposTareas.length > 0
                                                    ?
                                                    gruposTareas.map((grupo, i) => {
                                                        return (
                                                            <IonCard key={i}>
                                                                <IonToolbar>
                                                                    <IonTitle>
                                                                        Grupo {i + 1}
                                                                    </IonTitle>
                                                                    <IonButton fill={'clear'} shape={'round'} slot={'end'} onClick={() => { quitarGrupo(i) }} >
                                                                        <IonIcon icon={close} />
                                                                    </IonButton>
                                                                </IonToolbar>
                                                                <IonItem lines={'none'}>
                                                                    <IonLabel position={'floating'}>
                                                                        Nombre de grupo
                                                                    </IonLabel>
                                                                    <IonInput
                                                                        onIonInput={() => {setRequiereActualizar(true)}}
                                                                        type={'text'}
                                                                        onIonChange={(e: any) => { cambiarNombreDeGrupo(e.target.value, i) }}
                                                                        value={grupo.titulo}
                                                                    />
                                                                </IonItem>
                                                                <IonButton fill={'solid'} size={'small'} expand={'block'} onClick={() => { seleccionarNumeroRespuestas(grupo.elementos?.length && (grupo.elementos.length + 1), i) }}>
                                                                    Sumar Elemento
                                                                    <IonIcon style={{marginLeft: 10}} icon={add}/>
                                                                </IonButton>
                                                                {
                                                                    grupo.elementos?.map((elemento, n) => {
                                                                        return (
                                                                            <IonToolbar key={n} style={{marginLeft: 5}}>
                                                                                <IonLabel slot="start">
                                                                                    {n + 1}
                                                                                </IonLabel>
                                                                                <IonItem>
                                                                                    <IonLabel position={'floating'}>
                                                                                        Describa Elemento {n + 1}
                                                                                    </IonLabel>
                                                                                    <IonInput
                                                                                        type={'text'}
                                                                                        value={elemento.descripcion}
                                                                                        onIonInput={() => {setRequiereActualizar(true)}}
                                                                                        onIonChange={(e: any) => { modificarDescripcionElemento(e.target.value, n) }}
                                                                                    />
                                                                                </IonItem>
                                                                                <IonButton slot="end" fill={'clear'} onClick={() => { eliminarElemento(i, n) }} >
                                                                                    <IonIcon icon={close} />
                                                                                </IonButton>
                                                                            </IonToolbar>
                                                                        )
                                                                    })
                                                                }
                                                                <IonToolbar>
                                                                    <IonButton disabled={grupo.seleccionado} slot="end" onClick={() => { seleccionarGrupoTareas(grupo, i) }}>
                                                                        Seleccionar
                                                                    </IonButton>
                                                                </IonToolbar>
                                                            </IonCard>
                                                        )
                                                    })
                                                    :
                                                    <div
                                                        style={
                                                            {
                                                                width: '100%',
                                                                textAlign: 'center'
                                                            }
                                                        }
                                                    >
                                                        <button>
                                                            Mostrar Grupos
                                                        </button>
                                                    </div>
                                                }
                                                </div>
                                            </div>
                                        </IonCol>
                                        <IonCol size="5">
                                            {
                                                !grupoSelected
                                                ?
                                                <div
                                                    style={
                                                        {
                                                            width: '100%',
                                                            textAlign: 'center'
                                                        }
                                                    }
                                                >
                                                    <h3>Seleccione un grupo</h3>
                                                </div>
                                                :
                                                <div className="input-contenedor-planilla margin-top-10 height-grupo-list">
                                                    <IonItem button lines={'none'} onClick={() => { agregarTareas() }}>
                                                        <IonIcon icon={add} slot={'start'}/>
                                                        <IonLabel>
                                                            Agregar Tarea
                                                        </IonLabel>
                                                        <IonLabel slot={'end'}>
                                                            Total: {tareas.length}
                                                        </IonLabel>
                                                    </IonItem>
                                                    <div className="height-grupo-list-detail">
                                                        {
                                                        tareas.map((tarea, i) => {
                                                                return(
                                                                    <IonCard key={i}>
                                                                        <IonToolbar>
                                                                            <IonTitle>
                                                                                Tarea {i + 1}
                                                                            </IonTitle>
                                                                            <IonButton fill={'clear'} shape={'round'} slot={'end'} onClick={() => { quitarTarea(i) }} >
                                                                                <IonIcon icon={close} />
                                                                            </IonButton>
                                                                        </IonToolbar>
                                                                        <IonItem>
                                                                            <IonLabel position={'floating'}>
                                                                                Descripción de la tarea
                                                                            </IonLabel>
                                                                            <IonTextarea
                                                                                autoGrow
                                                                                onIonChange={(e: any) => { cambiarDescripcionTarea(e.target.value, i) }}
                                                                                value={tarea.descripcionTarea}
                                                                            />
                                                                        </IonItem>
                                                                        <IonItem>
                                                                            <IonLabel position={'floating'}>
                                                                                Observaciones de la tarea
                                                                            </IonLabel>
                                                                            <IonTextarea
                                                                                autoGrow
                                                                                onIonChange={(e: any) => { cambiarDescripcionTarea(e.target.value, i) }}
                                                                                value={tarea.observaciones}
                                                                            />
                                                                        </IonItem>
                                                                    </IonCard>
                                                                )
                                                        }) 
                                                        }
                                                    </div>
                                                </div>
                                            }
                                        </IonCol>
                                    </IonRow>
                                </div>
                                :
                                <div style={
                                    {
                                        width: '100%',
                                        textAlign: 'center'
                                    }
                                }>
                                    <h3>Seleccione un protocolo</h3>
                                </div>
                                }
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>
        </IonContent>
    )
}

export default TemplatesContainer
