import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { useState } from "react"
import { Cliente, ContactoEmpresa } from "../../../interfaces/Cliente"
import { close } from "ionicons/icons"
import { clientsRouter } from "../../../router"
import { getDateWithTime } from "../../../functions"

const ClientModal = (
  {
    isOpen,
    closeModal,
    cliente
  }:{isOpen: boolean, closeModal: () => void, cliente?: Cliente}) => {
/*   const [ nombre, setNombre ] = useState<string>('')
  const [ apellido, setApellido ] = useState<string>('')
  const [ run, setRun ] = useState<string>('')
  const [ telefono, setTelefono ] = useState<string>('')
  const [ correo, setCorreo ] = useState<string>('') */
  
  /* const agregarContactoEmpresa = async () => {
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
  } */

  return (
    <IonModal isOpen={isOpen}>
      <IonToolbar>
        <IonTitle>{cliente?.empresa.nombre}</IonTitle>
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
                            <div style={{ margin: 10, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#ccc', borderStyle: 'solid' }}>
                                <IonItem>
                                    <IonLabel>
                                        Nombre: {contacto.nombre} {contacto.apellido}
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>
                                        Fono: <a href={`tel:${contacto.telefono}`}>{contacto.telefono}</a>
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>
                                        Email: <a href={`mailto:${contacto.correo}`}>{contacto.correo}</a>
                                    </IonLabel>
                                </IonItem>
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
                        <div key={index} style={{ margin: 10, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#ccc', borderStyle: 'solid' }}>
                            <IonItem>
                                <IonLabel>
                                    <strong>{contrato.descripcion?.toUpperCase()}</strong>
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    Tipo de contrato: <strong>{contrato.tipoContrato}</strong>
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    Fecha de inicio: {getDateWithTime(contrato.fechaInicio)}
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    Fecha de término: {getDateWithTime(contrato.fechaTermino)}
                                </IonLabel>
                            </IonItem>
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
        {/* <IonGrid>
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
        </IonGrid> */}
      </IonContent>
    </IonModal>
  )
}

export default ClientModal
