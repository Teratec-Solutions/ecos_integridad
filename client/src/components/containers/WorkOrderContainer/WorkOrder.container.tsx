import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from "@ionic/react"
import axios from "axios"
import { arrowBack } from "ionicons/icons"
import { useState } from "react"
import { useHistory } from "react-router"
import { Cliente, Contrato } from "../../../interfaces/Cliente"
import './WorkOrderContainer.css'

const WorkOrderContainer = () => {
    const [ woNumber, setWoNumber ] = useState<string>('')
    const [ description, setDescription ] = useState<string>('')
    const [ clientes, setClientes ] = useState<Cliente[]>([])
    const [ contratos, setContratos ] = useState<Contrato[]>([])
    const history = useHistory()
    const init = async () => {
        const response = await axios.get('/')
    }
    return (
        <IonContent className="bg-content">
            <div className="titles">
                <IonToolbar style={{ borderRadius: 10 }}>
                    <IonButton slot="start" fill={'clear'} onClick={() => {history.goBack()}}>
                        <IonIcon icon={arrowBack} />
                    </IonButton>
                    <IonTitle>
                        Orden de Trabajo
                    </IonTitle>
                </IonToolbar>
            </div>
            <div className="bg-content-users">
                <IonGrid>
                    <IonRow>
                        <IonCol sizeXl="3" sizeLg="3" sizeMd="6" sizeSm="12" sizeXs="12">
                            <div className='item-container-style'>
                                <IonItem className="item-style">
                                    <IonLabel position={'floating'}>N° OT</IonLabel>
                                    <IonInput
                                        value={woNumber}
                                        onIonChange={(e: any) => {setWoNumber(e.target.value)}}
                                    />
                                </IonItem>
                            </div>
                            <br />
                            <div className='item-container-style'>
                                <IonItem className="item-style">
                                    <IonLabel position={'floating'}>Cliente</IonLabel>
                                    <IonSelect interface={'popover'} className="item-select-style">
                                        <IonSelectOption>Cliente 1</IonSelectOption>
                                        <IonSelectOption>Cliente 2</IonSelectOption>
                                        <IonSelectOption>Cliente 3</IonSelectOption>
                                        <IonSelectOption>Cliente 4</IonSelectOption>
                                        <IonSelectOption>Cliente 5</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                            </div>
                            <br />
                            <div className='item-container-style'>
                                <IonItem className="item-style">
                                    <IonLabel position={'floating'}>Contrato</IonLabel>
                                    <IonSelect interface={'popover'} className="item-select-style">
                                        <IonSelectOption>Contrato 1</IonSelectOption>
                                        <IonSelectOption>Contrato 2</IonSelectOption>
                                        <IonSelectOption>Contrato 3</IonSelectOption>
                                        <IonSelectOption>Contrato 4</IonSelectOption>
                                        <IonSelectOption>Contrato 5</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                            </div>
                        </IonCol>
                        <IonCol sizeXl="3" sizeLg="3" sizeMd="6" sizeSm="12" sizeXs="12">
                            <div className='item-container-style'>
                                <IonItem className="item-style">
                                    <IonTextarea
                                        placeholder="Descipción..."
                                        rows={10}
                                        value={description}
                                        onIonChange={(e: any) => {setDescription(e.target.value)}}
                                    />
                                </IonItem>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>
        </IonContent>
    )
}

export default WorkOrderContainer
