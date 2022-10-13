import { IonButton, IonButtons, IonContent, IonIcon, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from "@ionic/react"
import { closeOutline } from "ionicons/icons"
import { Contrato } from "../../../interfaces/Cliente"

const ContractsSelectionModal = ({setContrato, open, contratos, close}:{setContrato: (contrato: Contrato) => void, open: boolean, contratos: Contrato[], close: () => void}) => {
    
    const seleccionarContrato = (contrato: Contrato) => {
        setContrato(contrato)
    }
    
    return (
        <IonModal
            isOpen={open}
            backdropDismiss={false}
        >
            <IonToolbar>
                <IonTitle color={'primary'}>
                    Contratos
                </IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={close}>
                        <IonIcon icon={closeOutline} />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            <IonContent className="ion-padding">
                {
                    contratos.length > 0
                    ?
                    contratos.map((contrato, i) => {
                        return (
                            <IonItem key={i} button onClick={() => { seleccionarContrato(contrato) }}>
                                <IonLabel>{contrato.descripcion}</IonLabel>
                            </IonItem>
                        )
                    })
                    :
                    <div> <p> Cliente no tiene contratos asociados </p> </div>
                }
            </IonContent>
        </IonModal>
    )
}

export default ContractsSelectionModal
