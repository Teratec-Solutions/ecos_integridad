import { IonButton, IonContent, IonIcon, IonTitle, IonToolbar } from "@ionic/react"
import { arrowBack } from "ionicons/icons"
import { useHistory } from "react-router"

const WorkOrdersContainer = () => {
    const history = useHistory()
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
                    <IonButton slot="end"/*  onClick={() => {history.push('/user')}} */>
                        Nueva OT
                    </IonButton>
                </IonToolbar>
            </div>
        </IonContent>
    )
}

export default WorkOrdersContainer
