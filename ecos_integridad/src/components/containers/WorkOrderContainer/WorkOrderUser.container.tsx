import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonFooter, IonGrid, IonIcon, IonInput, IonItem, IonItemGroup, IonLabel, IonLoading, IonRow, IonTextarea, IonTitle, IonToolbar } from "@ionic/react"
import { add, arrowBack, camera, locate } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { Ordenes, Tarea } from "../../../interfaces/Ordenes"
import { woRouter } from "../../../router"
import { Navigation, Pagination, Scrollbar, A11y, EffectCreative, Keyboard, Zoom } from 'swiper'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import TareasContainer from "../Tareas/Tareas.container"
import { Geolocation, Position } from '@capacitor/geolocation';
import { Template } from "../../../interfaces/Template"
import { woIndexedDb } from "../../../indexedDb"
import { WoById, WoDatabase } from "../../../interfaces/IndexedDb"

/* import "swiper/swiper-bundle.min.css"
import "swiper/swiper.min.css" */

const WorkOrderUserContainer = () => {
    const [orden, setOrden] = useState<Ordenes>()
    const [plantilla, setPlantilla] = useState<Template>()
    const [showLoading, setShowLoading] = useState(false);
    const [tareas, setTareas] = useState<Tarea[]>([])
    const id : {id: string} = useParams()
    const history = useHistory()
    const [swiperRef, setSwiperRef] = useState<any>()

    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        if (window.navigator.onLine) {
            setShowLoading(true)
            const response = await woRouter.getWoById(id.id)
            console.log(response.data.data)
            if (response.data.data.protocolo[0]) {
                setPlantilla(response.data.data.protocolo[0])
            }
            setOrden(response.data.data)
            setShowLoading(false)
        } else {
            const {database}: WoDatabase = await woIndexedDb.init()
            const responseWoDb: WoById = await woIndexedDb.leerWoPorId(id.id, database)
            console.log(responseWoDb)
            if (responseWoDb.data.protocolo[0]) {
                setPlantilla(responseWoDb.data.protocolo[0])
            }
            setOrden(responseWoDb.data)
            setShowLoading(false)
        }
    }

    const addTarea = () => {
        setTareas(arr => [...arr, {
            idTarea: Date.now(),
            descripcion: ''
        }])
    }
    
    const printCurrentPosition = async (tarea: Tarea, index: number) => {
        const coordinates: Position = await Geolocation.getCurrentPosition()
        console.log('Current position:', coordinates)
        const position = {
            lat: coordinates.coords.latitude,
            lng: coordinates.coords.longitude
        }
        tarea.locate = position
        tareas[index] = tarea
        setTareas([...tareas])
    }


    return (
        <>
            <IonContent>
                <IonLoading
                    cssClass='my-custom-class'
                    isOpen={showLoading}
                    message={'Cargando Orden de Trabajo...'}
                />
                <IonToolbar>
                    <IonButton slot='start' fill={'clear'} onClick={() => {history.goBack()}}>
                        <IonIcon icon={arrowBack} />
                    </IonButton>
                    <IonTitle>
                        OT {orden?.nroWo}
                    </IonTitle>
                    <IonTitle slot='end'>
                        Prioridad: {orden?.prioridad}
                    </IonTitle>
                </IonToolbar>
                <Swiper
                    spaceBetween={1}
                    slidesPerView={1}
                    /* onSlideChange={(e) => console.log('slide change', e)} */
                    onSwiper={(swiper) => setSwiperRef(swiper)}
                >
                    <SwiperSlide
                        style={
                            {
                                height: 610,
                                overflowY: 'auto'
                            }
                        }   
                    >
                        <IonCard>
                            <IonCardHeader
                                style={
                                    {
                                        textAlign: 'center'
                                    }
                                }
                            >
                                <IonCardTitle>
                                    Detalles de la Orden
                                </IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent
                                style={
                                    {
                                        /* padding: 10, */
                                        textAlign: 'justify'
                                    }
                                }
                            >
                                <p>
                                    <strong>Cliente:</strong>
                                </p>
                                <p style={
                                    {
                                        marginLeft: 10
                                    }
                                }>
                                    {orden?.cliente && orden?.cliente[0].empresa.nombre}
                                </p>
                                <p>
                                    <strong>Contrato:</strong>
                                </p>
                                <p style={
                                    {
                                        marginLeft: 10
                                    }
                                }>
                                    {orden?.contrato && (orden?.contrato[0].descripcion ? orden?.contrato[0].descripcion : 'No informado')}
                                </p>
                                <p>
                                    <strong>Contacto:</strong>
                                </p>
                                <p style={
                                    {
                                        marginLeft: 10
                                    }
                                }>
                                    {
                                        orden?.cliente && 
                                        (orden?.cliente[0].empresa.contactos && 
                                            orden?.cliente[0].empresa.contactos[0].nombre ? orden?.cliente[0].empresa.contactos[0].nombre + ' ' + orden?.cliente[0].empresa.contactos[0].apellido : 'No informado'
                                        )
                                    }
                                </p>
                                <br />
                                <p>
                                    <strong>Descripción:</strong>
                                </p>
                                <p>
                                    {orden?.descripcion}
                                </p>
                            </IonCardContent>
                        </IonCard>
                    </SwiperSlide>
                    <SwiperSlide
                        style={
                            {
                                height: 610,
                                overflowY: 'auto'
                            }
                        }   
                    >
                        {
                            plantilla
                            ?
                            <div>
                                <IonCard>
                                    <IonCardHeader
                                        style={
                                            {
                                                textAlign: 'center'
                                            }
                                        }
                                    >
                                        <IonCardTitle>
                                            {plantilla.nombrePlanilla}
                                        </IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonItemGroup color={'primary'}>
                                            Informaciones:
                                        </IonItemGroup>
                                        {
                                            plantilla.informacion.map((info, num) => {
                                                return (
                                                    <IonItem key={num}>
                                                        <IonLabel position={'floating'}>
                                                            {info.nombreDato}
                                                        </IonLabel>
                                                        <IonInput

                                                        />
                                                    </IonItem>
                                                )
                                            })
                                        }
                                    </IonCardContent>
                                </IonCard>
                                <IonCard>
                                    
                                        <IonCardHeader color={'primary'}>
                                            Tareas:
                                        </IonCardHeader>
                                        {
                                            plantilla.contenido.map((grupo, num) => {
                                                return (
                                                    <div key={num}>
                                                        <IonToolbar>
                                                            <IonTitle>
                                                                {grupo.titulo}
                                                            </IonTitle>
                                                        </IonToolbar>
                                                        {
                                                            grupo.tareas.map((tarea, i) => {
                                                                return (
                                                                    <div style={{ padding: 5 }} key={i}>
                                                                        <p> {i + 1}.- {tarea.descripcionTarea}</p>
                                                                        {
                                                                            grupo.elementos?.map((elemento, index) => {
                                                                                return (
                                                                                    <IonItem key={index}>
                                                                                        <IonLabel position={'floating'}>
                                                                                            {elemento.descripcion}
                                                                                        </IonLabel>
                                                                                        <IonInput

                                                                                        />
                                                                                    </IonItem>
                                                                                )
                                                                            })
                                                                        }
                                                                        <IonItem>
                                                                            <IonLabel position={'floating'}>
                                                                                Observación
                                                                            </IonLabel>
                                                                            <IonTextarea
                                                                                autoGrow
                                                                            />
                                                                        </IonItem>
                                                                        <IonToolbar>
                                                                            <IonButtons slot="end">
                                                                                <IonButton color={'primary'} fill={'clear'}>
                                                                                    <IonIcon slot={'icon-only'} icon={camera} />
                                                                                </IonButton>
                                                                                <IonButton color={'primary'} fill={'clear'}>
                                                                                    <IonIcon slot={'icon-only'} icon={locate} />
                                                                                </IonButton>
                                                                            </IonButtons>
                                                                        </IonToolbar>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                </IonCard>
                            </div>
                            :
                            <IonCard>
                            <IonCardHeader
                                style={
                                    {
                                        textAlign: 'center'
                                    }
                                }
                            >
                                <IonCardTitle>
                                    Tareas de la OT
                                </IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent
                                style={
                                    {
                                        textAlign: 'justify'
                                    }
                                }
                            >
                                <TareasContainer tareas={tareas} printCurrentPosition={printCurrentPosition} />
                            </IonCardContent>
                        </IonCard>}
                        <IonFab hidden={plantilla ? true : false} vertical={'bottom'} horizontal={'end'} slot="fixed">
                            <IonFabButton onClick={() => {addTarea()}}>
                                <IonIcon icon={add} />
                            </IonFabButton>
                        </IonFab>
                    </SwiperSlide>
                    <SwiperSlide
                        style={
                            {
                                height: 610,
                                overflowY: 'auto'
                            }
                        }   
                    >
                        <IonCard>
                            <IonCardHeader
                                style={
                                    {
                                        textAlign: 'center'
                                    }
                                }
                            >
                                <IonCardTitle>
                                    Comentarios
                                </IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent
                                style={
                                    {
                                        /* padding: 10, */
                                        textAlign: 'justify'
                                    }
                                }
                            >
                                <div
                                    style={
                                        {
                                            borderStyle: 'solid',
                                            borderColor: '#ccc',
                                            borderWidth: 1,
                                            borderRadius: 20
                                        }
                                    }
                                >
                                    <IonTextarea
                                        maxlength={1000}
                                        placeholder="Deje sus comentarios al finalizar"
                                        autoGrow
                                    />
                                </div>
                                <br />
                                <IonButton
                                    expand={'block'}
                                >
                                    Enviar a revisión
                                </IonButton>
                            </IonCardContent>
                        </IonCard>
                    </SwiperSlide>
                </Swiper>
            </IonContent>
            <IonFooter>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            
                        </IonCol>
                        <IonCol>
                            <IonButton onClick={() => swiperRef.slideTo(0)}>
                                1
                            </IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton onClick={() => swiperRef.slideTo(1)}>
                                2
                            </IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton onClick={() => swiperRef.slideTo(2)}>
                                3
                            </IonButton>
                        </IonCol>
                        <IonCol>
                            
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonFooter>
        </>
    )
}

export default WorkOrderUserContainer
