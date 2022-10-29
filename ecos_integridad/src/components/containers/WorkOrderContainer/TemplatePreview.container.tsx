import { IonButton, IonCard, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react'
import { close, trash } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import { Elemento, GrupoTareas, Informacion, Tarea, Template } from '../../../interfaces/Template'

const TemplatePreviewContainer = (
    {
        planilla,
        actualizarPlanilla,
        indexPlanilla
    }:{
        planilla: Template,
        actualizarPlanilla: (planilla: Template, index: number) => void,
        indexPlanilla: number
    }) => {
    useEffect(() => {
        console.log(planilla)
        /* goToDown() */
    }, [planilla.contenido])

    const goToDown = () => {
        const element = document.getElementById('planilla')
        if (element) {
            element.scrollTop = element.scrollHeight
        }
    }

    const sumarTarea = (index: number) => {
        const planillaCache = planilla
        const contenido = [...planilla.contenido]
        const tareas = [...contenido[index].tareas]
        tareas.push({
            descripcionTarea: ''
        })
        contenido[index].tareas = tareas
        planillaCache.contenido = contenido
        actualizarPlanilla(planillaCache, indexPlanilla)
    }

    const elementosPorTarea = (nroElementos: number) => {
        const elementos: Elemento[] = []
        for ( let i = 0; i < nroElementos; i++) {
            elementos.push({
                descripcion: ''
            })
            if (i === (nroElementos - 1)) {
                console.log(elementos, nroElementos)
                return elementos
            }
        }
    }

    const cambiarTotalRespuesta = (totalRespuestas: number, index: number) => {
            const planillaCache = planilla
            const contenido = [...planilla.contenido]
            contenido[index].totalRespuestas = totalRespuestas
            planillaCache.contenido = contenido
            actualizarPlanilla(planillaCache, indexPlanilla)
        
    }

    const cambiarNombrePlanilla = (value: string) => {
        const planillaCache = planilla
        planillaCache.nombrePlanilla = value
        actualizarPlanilla(planillaCache, indexPlanilla)
    }

    const quitarInformacion = (index: number) => {
        const i : Informacion[] = planilla.informacion.filter((info, n) => {
            if (n === index) {
                return null
            } else {
                return info
            }
        })
        const planillaCache = planilla
        planillaCache.informacion = i
        actualizarPlanilla(planillaCache, indexPlanilla)
    }

    const quitarGrupo = (index: number) => {
        const g : GrupoTareas[] = planilla.contenido.filter((info, n) => {
            if (n === index) {
                return null
            } else {
                return info
            }
        })
        const planillaCache = planilla
        planillaCache.contenido = g
        actualizarPlanilla(planillaCache, indexPlanilla)
    }

    const quitarTarea = (indexGrupo: number, indexTarea: number) => {
        const t: Tarea[] = planilla.contenido[indexGrupo].tareas.filter((tarea, n) => {
            if (n === indexTarea) {
                return null
            } else {
                return tarea
            }
        })
        const planillaCache = planilla
        planillaCache.contenido[indexGrupo].tareas = t
        actualizarPlanilla(planillaCache, indexPlanilla)
    }

    return (
        <div className='planilla-container' id='planilla'>
            {
                planilla && <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonCard>
                            <IonItem>
                                <IonLabel position={'floating'}>
                                    Nombre Planilla
                                </IonLabel>
                                <IonInput
                                    onIonChange={(e: any) => { cambiarNombrePlanilla(e.target.value) }}
                                    value={planilla.nombrePlanilla}
                                />
                            </IonItem>
                        </IonCard>
                    </IonCol>
                    <IonCol>
                        
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonToolbar>
                        <IonTitle>
                            Información
                        </IonTitle>
                    </IonToolbar>
                    <IonCard /* className='bordes-para-informacion' */>
                        {
                            (planilla.informacion.length > 0)
                            ?
                            <></>
                            :
                            <IonToolbar>
                                <IonTitle>
                                    Sin datos
                                </IonTitle>
                            </IonToolbar>
                        }
                        {
                            
                            planilla.informacion?.map((item, index) => {
                                return (
                                    <IonCol key={index} size='6'>
                                        <IonRow>
                                            <IonCol size='6'>
                                                <IonItem>
                                                    <IonLabel color={'primary'} position={'floating'}>
                                                        Nombre del dato
                                                    </IonLabel>
                                                    <IonInput
                                                        onIonChange={(e: any) => { /* cambiarNombreDelDato(e.target.value, index) */ }}
                                                        value={item.nombreDato}
                                                    />
                                                </IonItem>
                                            </IonCol>
                                            <IonCol>
                                                <IonItem>
                                                    <IonLabel color={'primary'} position={'floating'}>
                                                        Tipo del dato
                                                    </IonLabel>
                                                    <IonSelect interface={'popover'} value={item.tipoDato} onIonChange={(e: any) => { /* cambiarTipoDeDato(e.target.value, index) */ }}>
                                                        <IonSelectOption value={'texto'}>Texto</IonSelectOption>
                                                        <IonSelectOption value={'numero'}>Número</IonSelectOption>
                                                        <IonSelectOption value={'booleano'}>Buleano</IonSelectOption>
                                                        <IonSelectOption value={'localizacion'}>Localización</IonSelectOption>
                                                    </IonSelect>
                                                </IonItem>
                                            </IonCol>
                                            <IonCol size={'2'}>
                                                <IonButton onClick={() => { quitarInformacion(index) }}>
                                                    <IonIcon icon={close} />
                                                </IonButton>
                                            </IonCol>
                                        </IonRow>
                                    </IonCol>
                                )
                            })
                        }
                    </IonCard>
                </IonRow>
                <IonRow>
                    <IonToolbar>
                        <IonTitle>
                            Grupos de Tareas
                        </IonTitle>
                    </IonToolbar>
                </IonRow>
                
                {
                    (planilla.contenido.length > 0)
                    ?
                    <></>
                    :
                    <IonToolbar>
                        <IonTitle>
                            Sin datos
                        </IonTitle>
                    </IonToolbar>
                }
                {
                    
                    planilla.contenido?.map((item, index) => {
                        return (
                            <IonCard key={index}>
                                <IonToolbar>
                                    <IonItem>
                                        <IonLabel position={'floating'}>
                                            Nombre Grupo
                                        </IonLabel>
                                        <IonInput
                                            value={item.titulo}
                                        />
                                    </IonItem>
                                    <IonButton fill='clear' slot='end' onClick={() => { quitarGrupo(index) }}>
                                        <IonIcon icon={close} />
                                    </IonButton>
                                </IonToolbar>
                                <IonGrid>
                                    <div /* className='bordes-para-tareas' */>
                                        <IonRow>
                                            <IonCol size='3'>
                                                <IonButton onClick={() => { sumarTarea(index) }}>
                                                    Sumar Tarea
                                                </IonButton>
                                            </IonCol>
                                            <IonCol size='3'>
                                                <IonItem>
                                                    <IonLabel position={'floating'}>
                                                        Numero de respuestas
                                                    </IonLabel>
                                                    <IonSelect
                                                        interface={'popover'}
                                                        value={item.totalRespuestas}
                                                        onIonChange={(e: any) => {
                                                            cambiarTotalRespuesta(e.target.value, index)
                                                        }}
                                                        >
                                                            <IonSelectOption value={0}>0</IonSelectOption>
                                                            <IonSelectOption value={1}>1</IonSelectOption>
                                                            <IonSelectOption value={2}>2</IonSelectOption>
                                                            <IonSelectOption value={3}>3</IonSelectOption>
                                                            <IonSelectOption value={4}>4</IonSelectOption>
                                                            <IonSelectOption value={5}>5</IonSelectOption>
                                                            <IonSelectOption value={6}>6</IonSelectOption>
                                                            <IonSelectOption value={7}>7</IonSelectOption>
                                                            <IonSelectOption value={8}>8</IonSelectOption>
                                                            {/* <IonSelectOption value={9}>9</IonSelectOption>
                                                            <IonSelectOption value={10}>10</IonSelectOption>
                                                            <IonSelectOption value={11}>11</IonSelectOption>
                                                            <IonSelectOption value={12}>12</IonSelectOption>
                                                            <IonSelectOption value={13}>13</IonSelectOption> */}
                                                    </IonSelect>
                                                </IonItem>
                                            </IonCol>
                                        </IonRow>
                                        <div className='tareas-container'>
                                            
                                        <IonRow className={'tarea-fila'}>
                                            <IonCol className={'tarea-columna'}>
                                                <p></p>
                                            </IonCol>
                                            {
                                                elementosPorTarea(item.totalRespuestas ? item.totalRespuestas : 0)?.map((elemento, i) => {
                                                    return (
                                                        <IonCol key={i} className={'tarea-columna'} size={(Math.trunc(9/Math.trunc(item.totalRespuestas ? item.totalRespuestas : 1))).toLocaleString()}>
                                                            <textarea style={{ width: '100%' }} value={elemento.descripcion} />
                                                        </IonCol>
                                                    )
                                                })
                                            }
                                            <IonCol size='1' className={'tarea-columna'}>
                                                <p></p>
                                            </IonCol>
                                        </IonRow>
                                        {
                                            item.tareas.map((tarea, i) => {
                                                
                                                return (
                                                    <div key={i}>
                                                        <IonRow className={'tarea-fila'}>
                                                            <IonCol size='1' className={'tarea-columna'}>
                                                                <p>{i + 1}</p>
                                                            </IonCol>
                                                            <IonCol className={'tarea-columna'}>
                                                                <textarea placeholder='Descripción pregunta' value={tarea.descripcionTarea} />
                                                            </IonCol>
                                                            {
                                                                elementosPorTarea(item.totalRespuestas ? item.totalRespuestas : 0)?.map((elemento, i) => {
                                                                    return (
                                                                        <IonCol key={i} className={'tarea-columna'} size={(Math.trunc(9/Math.trunc(item.totalRespuestas ? item.totalRespuestas : 1))).toLocaleString()}>
                                                                            {/* <input placeholder='Descripción respuesta' value={elemento.descripcion} /> */}
                                                                        </IonCol>
                                                                    )
                                                                })
                                                            }
                                                            <IonCol size='1' className={'tarea-columna'}>
                                                                <IonButton onClick={() => { quitarTarea(index, i) }} fill={'clear'} size={'small'}>
                                                                    <IonIcon color='danger' slot={'icon-only'} icon={trash} />
                                                                </IonButton>
                                                            </IonCol>
                                                        </IonRow>
                                                    </div>
                                                )
                                            })
                                        }
                                        </div>
                                    </div>
                                </IonGrid>
                            </IonCard>
                        )
                    })
                }
            </IonGrid>
            }
        </div>
    )
}

export default TemplatePreviewContainer
