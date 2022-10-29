import { IonFab, IonFabButton, IonFabList, IonIcon, IonTextarea } from "@ionic/react";
import { add, camera, chevronBack, locate } from "ionicons/icons";
import { useEffect } from "react";
import { Tarea } from "../../../interfaces/Ordenes";


const TareasContainer = ({tareas, printCurrentPosition}:{tareas: Tarea[], printCurrentPosition: (tarea: Tarea, index: number) => void}) => {
    useEffect(() => {
        console.log(tareas)
        let scroll_to_bottom = document.getElementById('tareas')
        if (scroll_to_bottom) {
            scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight;
        }
    }, [tareas])
    
    return (
        <div
            id={'tareas'}
            style={
                {
                    overflowY: 'auto',
                    maxHeight: 500
                }
        }>
            {
                tareas.map((tarea, index) => {
                    return (
                        <div key={index} style={
                            {
                                padding: 5,
                                paddingRight: 20,
                                backgroundColor: '#f5f5f5',
                                marginBottom: 20,
                                borderRadius: 10,
                                position: 'relative'
                            }
                        }>
                            <p>
                                ID Tarea { index + 1 }
                            </p>
                            <p>
                                Descripción:
                            </p>
                            <div style={{
                                backgroundColor: 'white',
                                borderColor: '#ccc',
                                borderStyle: 'solid',
                                borderWidth: 1,
                                borderRadius: 10
                            }}>
                                <IonTextarea
                                    maxlength={300}
                                    style={{
                                        backgroundColor: 'white'
                                    }}
                                    value={tarea.descripcion}
                                    autoGrow
                                />
                            </div>
                            <br />
                            <div>
                                <p>Localización:</p>
                                <div>
                                    {
                                        (!tarea.locate)
                                        ?
                                        <p> Tarea sin coordenadas </p>
                                        :
                                        <div>
                                            <p>
                                                Lat: {tarea.locate?.lat}
                                            </p>
                                            <p>
                                                Lon: {tarea.locate?.lng}
                                            </p>
                                        </div>
                                    }
                                </div>
                            </div>
                            <br />
                            <div>
                                <p>Imágenes:</p>
                                <div>
                                    {
                                        ((!tarea.imagenes) || (tarea.imagenes?.length === 0))
                                        &&
                                        <p> Sin imágenes cargadas </p>
                                    }
                                </div>
                            </div>
                            <IonFab vertical={'bottom'} horizontal={'end'} slot="fixed">
                            <IonFabButton size={'small'}>
                                <IonIcon icon={chevronBack} />
                            </IonFabButton>
                            <IonFabList side={'start'}>
                                <IonFabButton size={'small'}>
                                    <IonIcon icon={camera} />
                                </IonFabButton>
                                <IonFabButton size={'small'} onClick={() => {printCurrentPosition(tarea, index)}}>
                                    <IonIcon icon={locate} />
                                </IonFabButton>
                            </IonFabList>
                                
                            </IonFab>
                            <br />
                        </div>
                    )
                })
            }
            {
                tareas.length === 0 &&
                <div style={
                    {
                        textAlign: 'center',
                        width: '100%',
                        fontSize: 20
                    }
                }>
                    <p>
                        No hay tareas ingresadas
                    </p>
                </div>
            }
        </div>
    )
}

export default TareasContainer
