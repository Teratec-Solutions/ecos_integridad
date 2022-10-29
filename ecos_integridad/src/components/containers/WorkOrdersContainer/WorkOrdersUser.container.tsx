import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonLoading, IonRow, IonTitle, IonToolbar } from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { getSimpleDateTime } from '../../../functions'
import { woIndexedDb } from '../../../indexedDb'
import { WoActualiceDatabase, WoDatabase } from '../../../interfaces/IndexedDb'
import { Ordenes } from '../../../interfaces/Ordenes'
import { Usuario } from '../../../interfaces/Usuario'
import { woRouter } from '../../../router'

const WorkOrdersUserContainer = () => {
    const [workOrders, setWorkOrders] = useState<Ordenes[]>()
    const [showLoading, setShowLoading] = useState<boolean>(false)
    const history = useHistory()
    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        setShowLoading(window.navigator.onLine ? true : false)
        const usuario: Usuario = JSON.parse(window.localStorage.getItem('usuario')||'{}')
        const {database}: WoDatabase = await woIndexedDb.init()
        const response = window.navigator.onLine ? (await woRouter.getWoByUserId(usuario?._id)).data : await woIndexedDb.leerTodas(database)
        console.log(response)
        setWorkOrders(response.data)
        if (window.navigator.onLine) {
            setShowLoading(false)
            const ordenes: Ordenes[] = response.data.data
            console.log(ordenes)
            ordenes.forEach(async (orden, index) => {
                console.log(orden)
                const responseData: WoActualiceDatabase = await woIndexedDb.actualizar(orden, database)
                console.log(responseData)
            })
        }
    }

    const toWO = (order: Ordenes) => {
        history.push(`/work-order-user/${order._id}`)
    }
    
    return (
        <>
        <IonHeader className='ion-no-border'>
            <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                message={'Cargando Ordenes de Trabajo...'}
            />
            <IonToolbar>
                <IonButton slot='start' fill={'clear'} onClick={() => {history.goBack()}}>
                    <IonIcon icon={arrowBack} />
                </IonButton>
                <IonTitle>
                    Mis OTs
                </IonTitle>
            </IonToolbar>
            <IonGrid
                    style={{
                        paddingBottom: 0
                    }}
                    >
                <IonRow
                        style={{
                            paddingBottom: 0
                        }}
                    >
                    <IonCol size='2'
                        style={{
                            borderStyle: 'solid',
                            borderColor: '#ccc',
                            borderWidth: 1,
                            paddingBottom: 0
                        }}
                    >
                        <p
                            style={
                                {
                                    textAlign: 'center'
                                }
                            }
                        >N° OT</p>
                    </IonCol>
                    <IonCol size='4'
                        style={{
                            borderStyle: 'solid',
                            borderColor: '#ccc',
                            borderWidth: 1,
                            paddingBottom: 0
                        }}
                    >
                        <p
                            style={
                                {
                                    textAlign: 'center'
                                }
                            }
                        >Prioridad</p>
                    </IonCol>
                    <IonCol size='4'
                        style={{
                            borderStyle: 'solid',
                            borderColor: '#ccc',
                            borderWidth: 1,
                            paddingBottom: 0
                        }}
                    >
                        <p
                            style={
                                {
                                    textAlign: 'center'
                                }
                            }
                        >Programado</p>
                    </IonCol>
                    <IonCol size='2'
                        style={{
                            borderStyle: 'solid',
                            borderColor: '#ccc',
                            borderWidth: 1,
                            paddingBottom: 0
                        }}
                    >
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonHeader>
        <IonContent>
            <IonGrid
                style={{
                    paddingTop: 0
                }}
            >
                {
                    workOrders?.map((workOrder, index) => {
                        return (
                            <IonRow key={index}>
                                <IonCol size='2'
                                    style={{
                                        borderStyle: 'solid',
                                        borderColor: '#ccc',
                                        borderWidth: 1
                                    }}
                                >
                                    <p
                                        style={
                                            {
                                                textAlign: 'center'
                                            }
                                        }
                                    >{workOrder.nroWo}</p>
                                </IonCol>
                                <IonCol size='4'
                                    style={{
                                        borderStyle: 'solid',
                                        borderColor: '#ccc',
                                        borderWidth: 1
                                    }}
                                >
                                    <p
                                        style={
                                            {
                                                textAlign: 'center'
                                            }
                                        }
                                    >{workOrder.prioridad}</p>
                                </IonCol>
                                <IonCol size='4'
                                    style={{
                                        borderStyle: 'solid',
                                        borderColor: '#ccc',
                                        borderWidth: 1
                                    }}
                                >
                                    <p
                                        style={
                                            {
                                                textAlign: 'center'
                                            }
                                        }
                                    >{getSimpleDateTime(workOrder.fechaInicio)}</p>
                                </IonCol>
                                <IonCol size='2'
                                    style={{
                                        borderStyle: 'solid',
                                        borderColor: '#ccc',
                                        borderWidth: 1
                                    }}
                                >
                                    <p>
                                    <IonButton
                                        onClick={() => {toWO(workOrder)}}
                                        size={'small'}
                                        style={{ fontSize: 10 }}
                                    >
                                        <IonLabel>Ver</IonLabel>
                                    </IonButton>
                                    </p>
                                </IonCol>
                            </IonRow>
                        )
                    })
                }
            </IonGrid>
        </IonContent>
        </>
    )
}

export default WorkOrdersUserContainer
