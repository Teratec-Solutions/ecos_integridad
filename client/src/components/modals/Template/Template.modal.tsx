import { IonButton, IonButtons, IonCard, IonCol, IonGrid, IonIcon, IonModal, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { close, eye } from "ionicons/icons"
import { Elemento, Template } from "../../../interfaces/Template"

const TemplatePreviewModal = (
    {
      isOpen,
      closeModal,
      planilla
    }:{isOpen: boolean, closeModal: () => void, planilla?: Template}) => {
    const elementosPorTarea = (nroElementos: number) => {
        const elementos: Elemento[] = []
        for ( let i = 0; i < nroElementos; i++) {
            elementos.push({
                descripcion: ''
            })
            if (i === (nroElementos - 1)) {
                return elementos
            }
        }
    }
    return (
        <IonModal isOpen={isOpen}
            className={'preview-modal'}
        >
            
            <IonToolbar>
                <IonTitle color={'primary'}>
                    Vista Previa <IonIcon color={'primary'} icon={eye}/>
                </IonTitle>
                <IonButtons slot="end">
                    <IonButton color={'danger'} onClick={() => { closeModal() }}>
                        <IonIcon icon={close} />
                        <p style={{ marginTop: 18 }}>Cerrar</p>
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            <div style={{ width: '100%', overflowY: 'auto' }}>
                <IonGrid>
                    <IonRow>
                        <IonCol sizeXl='2' sizeLg="2" sizeMd="1" sizeSm="0" sizeXs="0">

                        </IonCol>
                        <IonCol sizeXl='8' sizeLg="8" sizeMd="10" sizeSm="12" sizeXs="12">
                            <IonCard style={
                                    {
                                        overflowY: 'auto'
                                    }
                                }>
                                <div style={
                                    {
                                        overflowY: 'auto'
                                    }
                                }>
                                    <div style={
                                        {
                                            textAlign: 'center'
                                        }
                                    }>
                                        <h3>
                                            {
                                                planilla?.nombrePlanilla
                                            }
                                        </h3>
                                    </div>
                                    <IonGrid>
                                        <IonRow>
                                            <IonToolbar>
                                                <IonTitle color={'primary'}>
                                                    Informacion
                                                </IonTitle>
                                            </IonToolbar>
                                            {
                                                planilla?.informacion.map((info, i) => {
                                                    return (
                                                        <IonCol key={i} size='6'
                                                            style={
                                                                {
                                                                    borderColor: '#ccc',
                                                                    borderStyle: 'solid',
                                                                    borderWidth: 1
                                                                }
                                                            }
                                                        >
                                                            <p>{info.nombreDato}: </p>
                                                        </IonCol>
                                                    )
                                                })
                                            }
                                        </IonRow>
                                        <IonRow>
                                            <IonToolbar>
                                                <IonTitle color={'primary'}>
                                                    Contenido
                                                </IonTitle>
                                            </IonToolbar>
                                            {
                                                planilla?.contenido.map((grupo, i) => {
                                                    return (
                                                        <IonCol key={i} size='12'
                                                            style={
                                                                {
                                                                    borderColor: '#ccc',
                                                                    borderStyle: 'solid',
                                                                    borderWidth: 1,
                                                                    marginBottom: 10
                                                                }
                                                            }
                                                        >
                                                            <IonTitle>{grupo.titulo}: </IonTitle>
                                                            <IonRow>
                                                                <IonCol
                                                                    style={
                                                                        {
                                                                            borderColor: '#ccc',
                                                                            borderStyle: 'solid',
                                                                            borderWidth: 1,
                                                                        }
                                                                    }
                                                                >
                                                                    <p>
                                                                        Descripción
                                                                    </p>
                                                                </IonCol>
                                                                {
                                                                    grupo.elementos?.map((elemento, i) => {
                                                                        return (
                                                                            <IonCol
                                                                                style={
                                                                                    {
                                                                                        borderColor: '#ccc',
                                                                                        borderStyle: 'solid',
                                                                                        borderWidth: 1,
                                                                                    }
                                                                                }
                                                                                key={i}
                                                                                size={(Math.trunc(9/Math.trunc(grupo.totalRespuestas ? grupo.totalRespuestas : 1))).toLocaleString()}
                                                                            >
                                                                                <p>{elemento.descripcion ? elemento.descripcion : 'Sin información'}</p>
                                                                            </IonCol>
                                                                        )
                                                                    })
                                                                }
                                                                <IonCol
                                                                    style={
                                                                        {
                                                                            borderColor: '#ccc',
                                                                            borderStyle: 'solid',
                                                                            borderWidth: 1,
                                                                        }
                                                                    }
                                                                >
                                                                    <p>
                                                                        Observaciones
                                                                    </p>
                                                                </IonCol>
                                                            </IonRow>
                                                            {
                                                                grupo.tareas.map((tarea, n) => {
                                                                    return (
                                                                        <IonRow
                                                                            key={n}
                                                                        >
                                                                            <IonCol
                                                                                style={
                                                                                    {
                                                                                        borderColor: '#ccc',
                                                                                        borderStyle: 'solid',
                                                                                        borderWidth: 1,
                                                                                    }
                                                                                }
                                                                            >
                                                                                <p>
                                                                                    {tarea.descripcionTarea}
                                                                                </p>
                                                                            </IonCol>
                                                                            {
                                                                                elementosPorTarea(grupo.totalRespuestas ? grupo.totalRespuestas : 0)?.map((elemento, i) => {
                                                                                    return (
                                                                                        <IonCol
                                                                                        style={
                                                                                            {
                                                                                                borderColor: '#ccc',
                                                                                                borderStyle: 'solid',
                                                                                                borderWidth: 1,
                                                                                            }
                                                                                        }
                                                                                        key={i}
                                                                                        size={(Math.trunc(9/Math.trunc(grupo.totalRespuestas ? grupo.totalRespuestas : 1))).toLocaleString()}>
                                                                                            
                                                                                        </IonCol>
                                                                                    )
                                                                                })
                                                                            }
                                                                            <IonCol
                                                                                style={
                                                                                    {
                                                                                        borderColor: '#ccc',
                                                                                        borderStyle: 'solid',
                                                                                        borderWidth: 1
                                                                                    }
                                                                                }
                                                                            >
                                                                                <p>
                                                                                    {tarea.observaciones}
                                                                                </p>
                                                                            </IonCol>
                                                                        </IonRow>
                                                                    )
                                                                })
                                                            }
                                                        </IonCol>
                                                    )
                                                })
                                            }
                                        </IonRow>
                                        <IonRow>
                                            <IonToolbar>
                                                <IonTitle color={'primary'}>
                                                    Firmas
                                                </IonTitle>
                                            </IonToolbar>
                                            <IonCol>
                                                <div
                                                    style={
                                                        {
                                                            borderColor: '#ccc',
                                                            borderWidth: 2,
                                                            borderStyle: 'solid',
                                                            height: 100
                                                        }
                                                    }
                                                >
                                                    <div
                                                        style={
                                                            {
                                                                textAlign: 'center'
                                                            }
                                                        }
                                                    >
                                                        <p>Firma de Responsable</p>
                                                    </div>
                                                </div>
                                            </IonCol>
                                            <IonCol>
                                                <div
                                                    style={
                                                        {
                                                            borderColor: '#ccc',
                                                            borderWidth: 2,
                                                            borderStyle: 'solid',
                                                            height: 100
                                                        }
                                                    }
                                                >
                                                    <div
                                                        style={
                                                            {
                                                                textAlign: 'center'
                                                            }
                                                        }
                                                    >
                                                        <p>Firma de Responsable</p>
                                                    </div>
                                                </div>
                                            </IonCol>
                                            <IonCol>
                                                <div
                                                    style={
                                                        {
                                                            borderColor: '#ccc',
                                                            borderWidth: 2,
                                                            borderStyle: 'solid',
                                                            height: 100
                                                        }
                                                    }
                                                >
                                                    <div
                                                        style={
                                                            {
                                                                textAlign: 'center'
                                                            }
                                                        }
                                                    >
                                                        <p>Firma de Responsable</p>
                                                    </div>
                                                </div>
                                            </IonCol>
                                            <IonCol>
                                                <div
                                                    style={
                                                        {
                                                            borderColor: '#ccc',
                                                            borderWidth: 2,
                                                            borderStyle: 'solid',
                                                            height: 100
                                                        }
                                                    }
                                                >
                                                    <div
                                                        style={
                                                            {
                                                                textAlign: 'center'
                                                            }
                                                        }
                                                    >
                                                        <p>Firma de Responsable</p>
                                                    </div>
                                                </div>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </div>
                            </IonCard>
                        </IonCol>
                        <IonCol sizeXl='2' sizeLg="2" sizeMd="1" sizeSm="0" sizeXs="0">

                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>
        </IonModal>
    )
}

export default TemplatePreviewModal
