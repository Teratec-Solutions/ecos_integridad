import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonRow, IonTitle, IonToolbar } from '@ionic/react'
import { Ordenes } from '../../../interfaces/Ordenes'
import { close } from 'ionicons/icons'
import { getSimpleDateTime } from '../../../functions'

const WorkOrderModal = (
    {
      isOpen,
      closeModal,
      orden
    }:{isOpen: boolean, closeModal: () => void, orden?: Ordenes}) => {
    return (
        <IonModal isOpen={isOpen}>
            <IonToolbar>
                <IonTitle><strong>Orden N°{orden?.nroWo}</strong></IonTitle>
                <IonButton fill={'clear'} shape={'round'} slot='end' onClick={() => {closeModal()}}>
                <IonIcon icon={close} />
                </IonButton>
            </IonToolbar>
            <IonContent className='ion-padding'>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <h4>Fecha Programado:</h4>
                            <p style={{ textAlign: 'justify' }}>
                                {getSimpleDateTime(orden?.fechaInicio)}
                            </p>
                        </IonCol>
                        <IonCol>
                            <h4>Fecha Término Estimado:</h4>
                            <p style={{ textAlign: 'justify' }}>
                                {orden?.fechaTermino ? getSimpleDateTime(orden?.fechaTermino) : 'No indicado'}
                            </p>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <h4>Descripción:</h4>
                            <p style={{ textAlign: 'justify' }}>
                                {orden?.descripcion}
                            </p>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size='4'>
                            <p>Cliente:</p>
                            <p>
                                {orden?.cliente?.map((cliente, i) => {
                                    return (
                                        <div key={i}>
                                            {cliente.empresa.nombre}
                                        </div>
                                    )
                                })}
                            </p>
                        </IonCol>
                        <IonCol size='4'>
                            <p>Operario Asignado:</p>
                            <p>
                                {orden?.asignado?.map((usuario, i) => {
                                    return (
                                        <div key={i}>
                                            {usuario.nombre} {usuario.apellido1} {usuario.apellido2}
                                        </div>
                                    )
                                })}
                            </p>
                        </IonCol>
                        <IonCol size='4'>
                            <p>Supervisor Asignado:</p>
                            <p>
                                {orden?.supervisor?.map((usuario, i) => {
                                    return (
                                        <div key={i}>
                                            {usuario.nombre} {usuario.apellido1} {usuario.apellido2}
                                        </div>
                                    )
                                })}
                            </p>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonModal>
    )
}

export default WorkOrderModal
