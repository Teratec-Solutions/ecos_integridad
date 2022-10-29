import { IonButton, IonButtons, IonContent, IonIcon, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from "@ionic/react"
import { closeOutline } from "ionicons/icons"
import { Cliente } from "../../../interfaces/Cliente"

const ClientSelectionModal = ({setCliente, open, clientes, close}:{setCliente: (cliente: Cliente) => void, open: boolean, clientes: Cliente[], close: () => void}) => {
    
    const seleccionarCliente = (cliente: Cliente) => {
        setCliente(cliente)
    }
    
    return (
        <IonModal
            isOpen={open}
            backdropDismiss={false}
        >
            <IonToolbar>
                <IonTitle color={'primary'}>
                    Clientes
                </IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={close}>
                        <IonIcon icon={closeOutline} />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            <IonContent className="ion-padding">
                {
                    clientes.map((cliente, i) => {
                        return (
                            <IonItem key={i} button onClick={() => { seleccionarCliente(cliente) }}>
                                <IonLabel>{cliente.empresa.nombre}</IonLabel>
                            </IonItem>
                        )
                    })
                }
            </IonContent>
        </IonModal>
    )
}

export default ClientSelectionModal