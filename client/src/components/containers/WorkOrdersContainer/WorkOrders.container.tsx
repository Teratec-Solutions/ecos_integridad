import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonRow, IonSpinner, IonTitle, IonToolbar } from "@ionic/react"
import axios from "axios"
import { arrowBack, eye, pencil, trash } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { Ordenes } from "../../../interfaces/Ordenes"

const WorkOrdersContainer = () => {
    const [ orders, setOrders ] = useState<Ordenes[]>([])
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const history = useHistory()
    useEffect(() => {
        init()
    }, [])
    
    const init = async () => {
        const response = await axios.get('/api/orders/getWorkOrders')
        setOrders(response.data.data)
        setIsLoading(false)
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
                    <IonRow>
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
                            <p style={{ textAlign: 'center'}}><strong>Ubicación</strong></p>
                        </IonCol>
                        <IonCol size="1" className="tabla">
                            <p style={{ textAlign: 'center'}}><strong>Fono contacto</strong></p>
                        </IonCol>
                        <IonCol size="2" className="tabla">
                            <p style={{ textAlign: 'center'}}><strong>Email contacto</strong></p>
                        </IonCol>
                        <IonCol size="1" className="tabla">
                            <p style={{ textAlign: 'center'}}><strong>Fecha de creación</strong></p>
                        </IonCol>
                        <IonCol size="2" className="tabla tabla-final">
                            <p style={{ textAlign: 'center'}}></p>
                        </IonCol>
                    </IonRow>
                    <IonSpinner hidden={!isLoading} name="bubbles"/>
                    {
                        orders?.map((orden, index) => {
                            return (
                                <IonRow key={index}>
                                    
                                    <IonCol size="3" className="tabla" style={{ textAlign: 'center' }}>
                                        <IonButton fill={'clear'}>
                                            <IonIcon icon={eye} />
                                        </IonButton>
                                        <IonButton fill={'clear'}>
                                            <IonIcon icon={pencil} />
                                        </IonButton>
                                        <IonButton fill={'clear'} color={'danger'}>
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
                </IonGrid>
            </div>
        </IonContent>
    )
}

export default WorkOrdersContainer
