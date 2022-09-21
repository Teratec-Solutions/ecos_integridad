import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonRow, IonSpinner, IonTitle, IonToolbar } from "@ionic/react"
import { arrowBack, eye, pencil, trash } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { getSimpleDateTime } from "../../../functions"
import { Ordenes } from "../../../interfaces/Ordenes"
import { woRouter } from "../../../router"

const WorkOrdersContainer = () => {
    const [ orders, setOrders ] = useState<Ordenes[]>([])
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const history = useHistory()
    useEffect(() => {
        init()
    }, [])
    
    const init = async () => {
        const response = await woRouter.getWoList()
        console.log(response.data.data)
        const list : Ordenes[] = response.data.data
        setOrders(list.reverse())
        setIsLoading(false)
    }

    const deleteOrder = async (_id: string | undefined) => {
        if (window.confirm('Confirme la eliminación de la orden.') && _id) {
            const response = await woRouter.deleteOrder(_id)
            if (response) {
                init()
            }
        }
    }
    return (
        <IonContent className="bg-content">
            <div className="titles">
                <IonToolbar style={{ borderRadius: 10 }}>
                    <IonButton slot="start" fill={'clear'} onClick={() => {history.goBack()}}>
                        <IonIcon icon={arrowBack} />
                    </IonButton>
                    <IonTitle>
                        Listado de OT
                    </IonTitle>
                    <IonButton slot="end" onClick={() => {history.push('/work-order')}}>
                        Nueva OT
                    </IonButton>
                </IonToolbar>
            </div>
            <div className="bg-content-users">
                <IonGrid style={{ textAlign: 'center' }}>
                    <IonRow style={{ paddingRight: 10 }}>
                        <IonCol size="0.5" className="tabla">
                            <p style={{ textAlign: 'center'}}><strong>Nro OT</strong></p>
                        </IonCol>
                        <IonCol size="2" className="tabla">
                            <p style={{ textAlign: 'center'}}><strong>Cliente</strong></p>
                        </IonCol>
                        <IonCol size="2.5" className="tabla">
                            <p style={{ textAlign: 'center'}}><strong>Descripción</strong></p>
                        </IonCol>
                        <IonCol size="1" className="tabla">
                            <p style={{ textAlign: 'center'}}><strong>Prioridad</strong></p>
                        </IonCol>
                        <IonCol size="1" className="tabla">
                            <p style={{ textAlign: 'center'}}><strong>Fono contacto</strong></p>
                        </IonCol>
                        <IonCol size="2" className="tabla">
                            <p style={{ textAlign: 'center'}}><strong>Email contacto</strong></p>
                        </IonCol>
                        <IonCol size="1" className="tabla">
                            <p style={{ textAlign: 'center'}}><strong>Fecha de inicio</strong></p>
                        </IonCol>
                        <IonCol size="2" className="tabla tabla-final">
                            <p style={{ textAlign: 'center'}}></p>
                        </IonCol>
                    </IonRow>
                    <div className="bg-content-list">
                        <IonSpinner hidden={!isLoading} name="bubbles"/>
                        {
                            orders?.map((orden, index) => {
                                console.log(orden)
                                return (
                                    <IonRow key={index}>
                                        <IonCol size="0.5" className="tabla">
                                            <p style={{ textAlign: 'center'}}>{orden.nroWo}</p>
                                        </IonCol>
                                        <IonCol size="2" className="tabla">
                                            <p style={{ textAlign: 'center'}}>{orden.cliente && (orden.cliente[0] && orden.cliente[0].empresa.nombre)}</p>
                                        </IonCol>
                                        <IonCol size="2.5" className="tabla">
                                            <p style={{ textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{orden.descripcion}</p>
                                        </IonCol>
                                        <IonCol size="1" className="tabla">
                                            <p style={{ textAlign: 'center'}}> {orden.prioridad} </p>
                                        </IonCol>
                                        <IonCol size="1" className="tabla">
                                            <p style={{ textAlign: 'center'}}>{orden.cliente && (orden.cliente[0] && orden.cliente[0].empresa.telefono)}</p>
                                        </IonCol>
                                        <IonCol size="2" className="tabla">
                                            <p style={{ textAlign: 'center'}}>{orden.cliente && (orden.cliente[0] && orden.cliente[0].empresa.correo)}</p>
                                        </IonCol>
                                        <IonCol size="1" className="tabla">
                                            <p style={{ textAlign: 'center'}}>{getSimpleDateTime(orden.fechaInicio)}</p>
                                        </IonCol>
                                        <IonCol size="2" className="tabla" style={{ textAlign: 'center' }}>
                                            <IonButton fill={'clear'}>
                                                <IonIcon icon={eye} />
                                            </IonButton>
                                            <IonButton fill={'clear'}>
                                                <IonIcon icon={pencil} onClick={() => {history.push(`/work-order/${orden._id}`)}}/>
                                            </IonButton>
                                            <IonButton fill={'clear'} color={'danger'} onClick={() => {deleteOrder(orden._id)}}>
                                                <IonIcon icon={trash} />
                                            </IonButton>
                                        </IonCol>
                                    </IonRow>
                                )
                            })
                        }
                        {
                            (orders.length === 0) && <div style={{ textAlign: 'center', width: '100%' }}>
                                <p style={{ fontSize: 20 }} hidden={isLoading}><strong>No hay ordenes</strong></p>
                            </div>
                        }
                    </div>
                </IonGrid>
            </div>
        </IonContent>
    )
}

export default WorkOrdersContainer
