import { IonButton, IonCol, IonContent, IonDatetime, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonRow, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from '@ionic/react'
import { useRef, useState } from 'react'
import { Cliente, Contrato } from '../../../interfaces/Cliente'
import { clipboard, close } from 'ionicons/icons'
import { getSimpleDateTime } from '../../../functions'
import { contratosRouter } from '../../../router'

const ClientContractModal = (
  {
    isOpen,
    closeModal,
    cliente
  }:{isOpen: boolean, closeModal: () => void, cliente?: Cliente}) => {
  const [ tipoContrato, setTipoContrato ] = useState<string>('')
  const [ descripcion, setDescripcion ] = useState<string>('')
  const [ fechaInicio, setFechaInicio ] = useState<Date>()
  const [ fechaTermino, setFechaTermino ] = useState<Date>()
  const modalFechaInicio = useRef<HTMLIonModalElement>(null)
  const modalFechaTermino = useRef<HTMLIonModalElement>(null)
  
  const agregarContrato = async () => {
    const clienteId = cliente?._id
    if (tipoContrato && descripcion && fechaInicio) {
      if (window.confirm(`Confirme el nuevo contrato ${descripcion}`)) {
        const contrato : Contrato = {
          tipoContrato: tipoContrato,
          descripcion: descripcion,
          fechaInicio: fechaInicio,
          fechaTermino: fechaTermino,
          cliente: clienteId || ''
        }
        console.log(contrato)
        const response = await contratosRouter.guardarContrato(contrato)
        if (response) {
          alert(`Contrato creado y asignado a cliente ${cliente?.empresa.nombre}`)
          setTipoContrato('')
          setDescripcion('')
          setFechaInicio(undefined)
          setFechaTermino(undefined)
          closeModal()
        }
      }
    } else {
      alert('Debe llenar todos los datos solicitados.')
    }
  }
  const closeFechaInicio = () => {
    modalFechaInicio.current?.dismiss()
  }
  const guardarFechaInicio = (e: any) => {
    if (window.confirm(`Confirme la fecha ${getSimpleDateTime(e.target.value)}`)) {
        setFechaInicio(e.target.value)
        closeFechaInicio()
    }
  }
  const closeFechaTermino = () => {
    modalFechaTermino.current?.dismiss()
  }
  const guardarFechaTermino = (e: any) => {
    if (window.confirm(`Confirme la fecha ${getSimpleDateTime(e.target.value)}`)) {
      setFechaTermino(e.target.value)
      closeFechaTermino()
    }
  }
  return (
    <IonModal isOpen={isOpen}>
      <IonToolbar>
        <IonTitle><IonIcon color={'primary'} size={'default'} icon={clipboard} style={{ marginTop: 0, position: 'relative' }} /> Agregar contrato a cliente {cliente?.empresa.nombre}</IonTitle>
        <IonButton fill={'clear'} shape={'round'} slot='end' onClick={() => {closeModal()}}>
          <IonIcon icon={close} />
        </IonButton>
      </IonToolbar>
      <IonContent className='ion-padding'>
        <IonGrid>
          <IonRow>
            <IonCol sizeXl='6' sizeLg='6' sizeMd='12' sizeSm='12' sizeXs='12'>
              <IonItem>
                <IonLabel position={'floating'}>Tipo de contrato</IonLabel>
                <IonSelect interface={'popover'} value={tipoContrato} onIonChange={(e: any) => { setTipoContrato(e.target.value) }}>
                  <IonSelectOption value={'Mantención'}>Mantención</IonSelectOption>
                  <IonSelectOption value={'Inspección'}>Inspección</IonSelectOption>
                  <IonSelectOption value={'Instalación'}>Instalación</IonSelectOption>
                  <IonSelectOption value={'Otro'}>Otro</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
            <IonCol sizeXl='12' sizeLg='12' sizeMd='12' sizeSm='12' sizeXs='12'>
              <IonItem>
                <IonLabel position={'floating'}>Descripción</IonLabel>
                <IonTextarea
                  rows={5}
                  clearOnEdit={false}
                  autoGrow
                  onIonChange={(e: any) => { setDescripcion(e.target.value) }}
                />
              </IonItem>
            </IonCol>
            <IonCol sizeXl='12' sizeLg='12' sizeMd='12' sizeSm='12' sizeXs='12'>
                <div>
                    <IonItem className='item-style' button id='abrir-fecha-inicio-modal'>
                        <IonLabel style={{ paddingTop: 8, paddingBottom: 8, textAlign: 'center' }}>
                            Fecha Inicio &nbsp;
                            {getSimpleDateTime(fechaInicio)}
                        </IonLabel>
                    </IonItem>
                </div>
            </IonCol>
            <IonCol sizeXl='12' sizeLg='12' sizeMd='12' sizeSm='12' sizeXs='12'>
                <div>
                    <IonItem className='item-style' button id='abrir-fecha-termino-modal'>
                        <IonLabel style={{ paddingTop: 8, paddingBottom: 8, textAlign: 'center' }}>
                            Fecha Término &nbsp;
                            {getSimpleDateTime(fechaTermino)}
                        </IonLabel>
                    </IonItem>
                </div>
            </IonCol>
          </IonRow>
          <br />
          <IonButton expand={'block'} color={'primary'} onClick={() => { agregarContrato() }}>
            Agregar Contrato
          </IonButton>
        </IonGrid>
      </IonContent>
      <IonModal
        trigger='abrir-fecha-inicio-modal'
        ref={modalFechaInicio}
      >
        <IonToolbar>
            <IonTitle>
                Seleccione Fecha de Inicio
            </IonTitle>
            <IonButton onClick={() => closeFechaInicio()} fill={'clear'} slot={'end'}>
                <IonIcon icon={close} />
            </IonButton>
        </IonToolbar>
        <IonDatetime
            onIonChange={(e: any) => {guardarFechaInicio(e)}}
            firstDayOfWeek={1}
            id='datetime' 
            style={{ margin: 'auto', borderColor: '#ccc', borderStyle: 'solid', borderWidth: 1, borderRadius: 20 }}
        />
      </IonModal>
      <IonModal
        trigger='abrir-fecha-termino-modal'
        ref={modalFechaTermino}
      >
        <IonToolbar>
            <IonTitle>
                Seleccione Fecha de Término
            </IonTitle>
            <IonButton onClick={() => closeFechaTermino()} fill={'clear'} slot={'end'}>
                <IonIcon icon={close} />
            </IonButton>
        </IonToolbar>
        <IonDatetime
            onIonChange={(e: any) => {guardarFechaTermino(e)}}
            firstDayOfWeek={1}
            id='datetime' 
            style={{ margin: 'auto', borderColor: '#ccc', borderStyle: 'solid', borderWidth: 1, borderRadius: 20 }}
        />
      </IonModal>
    </IonModal>
  )
}

export default ClientContractModal
