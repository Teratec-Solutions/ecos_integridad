import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonModal, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { Cliente } from "../../../interfaces/Cliente"
import { close } from "ionicons/icons"
import { getDateWithTime } from "../../../functions"

const ClientModal = (
  {
    isOpen,
    closeModal,
    cliente
  }:{isOpen: boolean, closeModal: () => void, cliente?: Cliente}) => {
  return (
    <IonModal isOpen={isOpen}>
      <IonToolbar>
        <IonTitle><strong>{cliente?.empresa.nombre}</strong></IonTitle>
        <IonButton fill={'clear'} shape={'round'} slot="end" onClick={() => {closeModal()}}>
          <IonIcon icon={close} />
        </IonButton>
      </IonToolbar>
      <IonContent className="ion-padding">
        <h3>Contactos</h3>
        <IonGrid>
            <IonRow>
            {
                cliente?.empresa.contactos?.map((contacto, i) => {
                    return (
                        <IonCol size="6" key={i}>
                            <div style={{ margin: 10, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#ccc', borderStyle: 'solid', width: '100%' }}>
                                <div style={{ paddingTop: 5, paddingBottom: 5 }}>
                                    <label>
                                        Nombre: {contacto.nombre} {contacto.apellido}
                                    </label>
                                </div>
                                <div style={{ paddingTop: 5, paddingBottom: 5 }}>
                                    <label>
                                        Fono: <a href={`tel:${contacto.telefono}`}>{contacto.telefono}</a>
                                    </label>
                                </div>
                                <div style={{ paddingTop: 5, paddingBottom: 5 }}>
                                    <label>
                                        Email: <a href={`mailto:${contacto.correo}`}>{contacto.correo}</a>
                                    </label>
                                </div>
                            </div>
                        </IonCol>
                    )
                })
            }
            {
                (cliente?.empresa.contactos?.length === 0) && 
                <IonItem>
                    No hay contactos asignados.
                </IonItem>
            }
            </IonRow>
        </IonGrid>
        <h3>Contratos</h3>
        <IonGrid>
            <IonRow>
            {
                cliente?.contratos?.map((contrato, index) => {
                    return (
                        <div key={index} style={{ margin: 10, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#ccc', borderStyle: 'solid', width: '100%' }}>
                            <div style={{ paddingTop: 5, paddingBottom: 5 }}>
                                <label>
                                    <strong>{contrato.descripcion?.toUpperCase()}</strong>
                                </label>
                            </div>
                            <div style={{ paddingTop: 5, paddingBottom: 5 }}>
                                <label>
                                    Tipo de contrato: <strong>{contrato.tipoContrato}</strong>
                                </label>
                            </div>
                            <div style={{ paddingTop: 5, paddingBottom: 5 }}>
                                <label>
                                    Fecha de inicio: {getDateWithTime(contrato.fechaInicio)}
                                </label>
                            </div>
                            <div style={{ paddingTop: 5, paddingBottom: 5 }}>
                                <label>
                                    Fecha de término: {getDateWithTime(contrato.fechaTermino)}
                                </label>
                            </div>
                        </div>
                    )
                })
            }
            {
                (cliente?.contratos?.length === 0) && 
                <IonItem>
                    Sin contratos asignados.
                </IonItem>
            }
            </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  )
}

export default ClientModal
