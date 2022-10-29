import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonRow, IonTitle, IonToolbar } from '@ionic/react'
import { close } from 'ionicons/icons'
import { getSimpleDateTime, nombreRole } from '../../../functions'
import { Usuario } from '../../../interfaces/Usuario'

const UserModal = (
  {
    isOpen,
    closeModal,
    usuario
  }:{isOpen: boolean, closeModal: () => void, usuario?: Usuario}) => {

  return (
    <IonModal isOpen={isOpen}>
      <IonToolbar>
        <IonTitle>{usuario?.nombre} {usuario?.apellido1} {usuario?.apellido2}</IonTitle>
        <IonButton fill={'clear'} shape={'round'} slot='end' onClick={() => {closeModal()}}>
          <IonIcon icon={close} />
        </IonButton>
      </IonToolbar>
      <IonContent className='ion-padding'>
        <IonGrid>
          <IonRow>
            <IonCol sizeXl='6' sizeLg='6' sizeMd='12' sizeSm='12' sizeXs='12'>
              <IonItem>
                <IonLabel>Rut: {usuario?.run}</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol sizeXl='6' sizeLg='6' sizeMd='12' sizeSm='12' sizeXs='12'>
              <IonItem>
                <IonLabel>Fono: {usuario?.fono ? usuario.fono : 'Sin información'}</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol sizeXl='6' sizeLg='6' sizeMd='12' sizeSm='12' sizeXs='12'>
              <IonItem>
                <IonLabel>Correo: {usuario?.email}</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol sizeXl='6' sizeLg='6' sizeMd='12' sizeSm='12' sizeXs='12'>
              <IonItem>
                <IonLabel>Tipo de usuario: <strong>{nombreRole(usuario?.role ? usuario.role : '')}</strong></IonLabel>
              </IonItem>
            </IonCol>
            <IonCol sizeXl='6' sizeLg='6' sizeMd='12' sizeSm='12' sizeXs='12'>
              <IonItem>
                <IonLabel>Rol: <strong>{usuario?.subRoles}</strong></IonLabel>
              </IonItem>
            </IonCol>
            <IonCol sizeXl='6' sizeLg='6' sizeMd='12' sizeSm='12' sizeXs='12'>
              <IonItem>
                <IonLabel>Estado: {usuario?.estado}</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol sizeXl='12' sizeLg='12' sizeMd='12' sizeSm='12' sizeXs='12'>
              <IonItem>
                <IonLabel>Fecha de Creación: {getSimpleDateTime(usuario?.createdAt)}</IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  )
}

export default UserModal
