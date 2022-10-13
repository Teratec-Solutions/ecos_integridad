import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonRow, IonTitle, IonToolbar } from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { getSimpleDateTime } from '../../../functions'
import { Ordenes } from '../../../interfaces/Ordenes'
import { Usuario } from '../../../interfaces/Usuario'
import { woRouter } from '../../../router'

const WorkOrdersUserContainer = () => {
    const [workOrders, setWorkOrders] = useState<Ordenes[]>()
    const history = useHistory()
    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        const usuario: Usuario = JSON.parse(window.localStorage.getItem('usuario')||'{}')
        const response = await woRouter.getWoByUserId(usuario?._id)
        console.log(response)
        setWorkOrders(response.data.data)
    }

    const toWO = (order: Ordenes) => {
        history.push(`/work-order-user/${order._id}`)
    }
    
    return (
        <>
        <IonHeader className='ion-no-border'>
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
