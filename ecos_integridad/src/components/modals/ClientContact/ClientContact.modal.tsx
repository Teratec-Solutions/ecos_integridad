import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { useState } from "react"
import { Cliente, ContactoEmpresa } from "../../../interfaces/Cliente"
import { close } from "ionicons/icons"
import { clientsRouter } from "../../../router"

const ClientContactModal = (
  {
    isOpen,
    closeModal,
    cliente
  }:{isOpen: boolean, closeModal: () => void, cliente?: Cliente}) => {
  const [ nombre, setNombre ] = useState<string>('')
  const [ apellido, setApellido ] = useState<string>('')
  const [ run, setRun ] = useState<string>('')
  const [ telefono, setTelefono ] = useState<string>('')
  const [ correo, setCorreo ] = useState<string>('')
  
  const agregarContactoEmpresa = async () => {
    if (nombre && apellido && run && telefono && correo) {
      if (window.confirm(`Confirme el nuevo contacto ${nombre} ${apellido}`)) {
        const contactoEmpresa : ContactoEmpresa = {
          nombre: nombre,
          apellido: apellido,
          run: run,
          telefono: telefono,
          correo: correo
        }
        if (cliente) {
          if (cliente.empresa.contactos) {
            if (cliente.empresa.contactos.length > 0) {
              cliente.empresa.contactos.push(contactoEmpresa)
            }
          } else {
            cliente.empresa.contactos = [contactoEmpresa]
          }
          const response = await clientsRouter.editClient(cliente)
          if (response) {
            alert(`Usuario ${nombre} ${apellido} agregado a ${cliente.empresa.nombre}`)
            closeModal()
          }
        }
      }
    } else {
      alert('Debe llenar todos los datos solicitados.')
    }
  }

  return (
    <IonModal isOpen={isOpen}>
      <IonToolbar>
        <IonTitle>Agregar contacto a cliente {cliente?.empresa.nombre}</IonTitle>
        <IonButton fill={'clear'} shape={'round'} slot="end" onClick={() => {closeModal()}}>
          <IonIcon icon={close} />
        </IonButton>
      </IonToolbar>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol sizeXl='6' sizeLg='6' sizeMd='12' sizeSm='12' sizeXs='12'>
              <IonItem>
                <IonLabel position={'floating'}>Nombre</IonLabel>
                <IonInput
                  onIonChange={(e: any) => { setNombre(e.target.value) }}
                />
              </IonItem>
            </IonCol>
            <IonCol sizeXl='6' sizeLg='6' sizeMd='12' sizeSm='12' sizeXs='12'>
              <IonItem>
                <IonLabel position={'floating'}>Apellido</IonLabel>
                <IonInput
                  onIonChange={(e: any) => { setApellido(e.target.value) }}
                />
              </IonItem>
            </IonCol>
            <IonCol sizeXl='6' sizeLg='6' sizeMd='12' sizeSm='12' sizeXs='12'>
              <IonItem>
                <IonLabel position={'floating'}>Run</IonLabel>
                <IonInput
                  onIonChange={(e: any) => { setRun(e.target.value) }}
                />
              </IonItem>
            </IonCol>
            <IonCol sizeXl='6' sizeLg='6' sizeMd='12' sizeSm='12' sizeXs='12'>
              <IonItem>
                <IonLabel position={'floating'}>Teléfono</IonLabel>
                <IonInput
                  onIonChange={(e: any) => { setTelefono(e.target.value) }}
                />
              </IonItem>
            </IonCol>
            <IonCol sizeXl='6' sizeLg='6' sizeMd='12' sizeSm='12' sizeXs='12'>
              <IonItem>
                <IonLabel position={'floating'}>Correo</IonLabel>
                <IonInput
                  onIonChange={(e: any) => { setCorreo(e.target.value) }}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <br />
          <IonButton expand={'block'} color={'primary'} onClick={() => { agregarContactoEmpresa() }}>
            Agregar Contacto
          </IonButton>
        </IonGrid>
      </IonContent>
    </IonModal>
  )
}

export default ClientContactModal
