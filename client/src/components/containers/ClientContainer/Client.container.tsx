import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonLoading, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import axios from "axios"
import { arrowBack } from "ionicons/icons"
import { useState } from "react"
import { useHistory, useParams } from "react-router"
import { Cliente } from "../../../interfaces/Cliente"
import { Usuario } from "../../../interfaces/Usuario"

const ClientContainer = () => {
    const _id: {id: string} = useParams()
    const [ showLoading, setShowLoading ] = useState<boolean>(false)
    const history = useHistory()
    const [ nombreEmpresa, setNombreEmpresa ] = useState<string>('')
    const [ runEmpresa, setRunEmpresa ] = useState<string>('')
    const [ fonoEmpresa, setFonoEmpresa ] = useState<string>('')
    const [ direccion, setDireccion ] = useState<string>('')
    const [ ciudad, setCiudad ] = useState<string>('')
    const [ region, setRegion ] = useState<string>('')
    const [ correoEmpresa, setCorreoEmpresa ] = useState<string>('')
    const [ latitud, setLatitud ] = useState<string>('')
    const [ longitud, setLongitud ] = useState<string>('')
    const crearCliente = async () => {
        /* console.log(nombreEmpresa,
            runEmpresa,
            fonoEmpresa,
            direccion,
            ciudad,
            region,
            latitud,
            longitud,
            correoEmpresa) */
        const cliente : Cliente = {
            empresa: {
                nombre: nombreEmpresa,
                run: runEmpresa,
                telefono: fonoEmpresa,
                correo: correoEmpresa,
                location: {
                    lat: latitud,
                    lng: longitud
                }
            },
            habilitado: true,
            contratos: [],
            createdBy: JSON.parse(localStorage.getItem('usuario') || '{}')
        }
        console.log(cliente)
        const response = await axios.post('/api/clients/createClient', cliente)
        console.log(response)
        if (response) {
            back()
        }
        /* cliente.empresa.nombre = nombreEmpresa
        cliente.empresa.run = runEmpresa
        cliente.empresa.telefono = fonoEmpresa
        cliente.empresa.direccion = direccion
        cliente.empresa.ciudad = ciudad
        cliente.empresa.region = region
        cliente.empresa.location.lat = latitud
        cliente.empresa.location.lng = longitud
        cliente.empresa.correo = correoEmpresa
        cliente.habilitado = true
        cliente.contratos = []
        const me: Usuario = JSON.parse(localStorage.getItem('usuario') || '{}')
        cliente.createdBy = [me]
        console.log(cliente) */
    }

    const back = () => {
        history.goBack()
    }
    
    return (
        <IonContent className="bg-content">
            <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                message={'Cargando datos...'}
            />
            <div className="titles">
                <IonToolbar style={{ borderRadius: 10 }}>
                    <IonButton slot="start" fill={'clear'} onClick={() => {back()}}>
                        <IonIcon icon={arrowBack} />
                    </IonButton>
                    <IonTitle>
                        Cliente
                    </IonTitle>
                </IonToolbar>
            </div>
            <IonGrid>
                <IonRow>
                    <IonCol>

                    </IonCol>
                    <IonCol sizeXs="12" sizeSm="12" sizeMd="8" sizeLg="7" sizeXl="6">
                        <div className="user-inputs">
                            <IonRow>
                                <IonCol sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="12" sizeXl="12">
                                    <IonItem>
                                        <IonLabel position={'floating'}>
                                            Nombre Empresa
                                        </IonLabel>
                                        <IonInput
                                            name="nombreEmpresa"
                                            value={nombreEmpresa}
                                            type={'text'}
                                            onIonChange={(e: any) => {setNombreEmpresa(e.target.value)}}
                                        />
                                    </IonItem>
                                </IonCol>
                                <IonCol sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="6" sizeXl="6">
                                    <IonItem>
                                        <IonLabel position={'floating'}>
                                            RUN Empresa
                                        </IonLabel>
                                        <IonInput
                                            name="run"
                                            value={runEmpresa}
                                            type={'text'}
                                            onIonChange={(e: any) => {setRunEmpresa(e.target.value)}}
                                        />
                                    </IonItem>
                                </IonCol>
                                <IonCol sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="6" sizeXl="6">
                                    <IonItem>
                                        <IonLabel position={'floating'}>
                                            Teléfono
                                        </IonLabel>
                                        <IonInput
                                            name="telefono"
                                            value={fonoEmpresa}
                                            type={'tel'}
                                            onIonChange={(e: any) => {setFonoEmpresa(e.target.value)}}
                                        />
                                    </IonItem>
                                </IonCol>
                                <IonCol sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="12" sizeXl="12">
                                    <IonItem>
                                        <IonLabel position={'floating'}>
                                            Dirección
                                        </IonLabel>
                                        <IonInput
                                            name="direccion"
                                            value={direccion}
                                            type={'text'}
                                            onIonChange={(e: any) => {setDireccion(e.target.value)}}
                                        />
                                    </IonItem>
                                </IonCol>
                                <IonCol sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="6" sizeXl="6">
                                    <IonItem>
                                        <IonLabel position={'floating'}>
                                            Ciudad
                                        </IonLabel>
                                        <IonInput
                                            name="ciudad"
                                            value={ciudad}
                                            type={'text'}
                                            onIonChange={(e: any) => {setCiudad(e.target.value)}}
                                        />
                                    </IonItem>
                                </IonCol>
                                <IonCol sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="6" sizeXl="6">
                                    <IonItem>
                                        <IonLabel position={'floating'}>
                                            Región
                                        </IonLabel>
                                        <IonInput
                                            name="region"
                                            value={region}
                                            type={'text'}
                                            onIonChange={(e: any) => {setRegion(e.target.value)}}
                                        />
                                    </IonItem>
                                </IonCol>
                                <IonCol sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="6" sizeXl="6">
                                    <IonItem>
                                        <IonLabel position={'floating'}>
                                            Correo Empresa
                                        </IonLabel>
                                        <IonInput
                                            name="correoEmpresa"
                                            value={correoEmpresa}
                                            type={'text'}
                                            onIonChange={(e: any) => {setCorreoEmpresa(e.target.value)}}
                                        />
                                    </IonItem>
                                </IonCol>
                                <IonCol sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="3" sizeXl="3">
                                    <IonItem>
                                        <IonLabel position={'floating'}>
                                            Latitud
                                        </IonLabel>
                                        <IonInput
                                            name="latitud"
                                            value={latitud}
                                            type={'text'}
                                            onIonChange={(e: any) => {setLatitud(e.target.value)}}
                                        />
                                    </IonItem>
                                </IonCol>
                                <IonCol sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="3" sizeXl="3">
                                    <IonItem>
                                        <IonLabel position={'floating'}>
                                            Longitud
                                        </IonLabel>
                                        <IonInput
                                            name="longitud"
                                            value={longitud}
                                            type={'text'}
                                            onIonChange={(e: any) => {setLongitud(e.target.value)}}
                                        />
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonButton expand={'block'} color={'danger'} onClick={() => {history.goBack()}}>
                                        Cancelar
                                    </IonButton>
                                </IonCol>
                                <IonCol>
                                    <IonButton expand={'block'} onClick={() => {crearCliente()}}>
                                        {_id.id ? 'Editar' : 'Crear'} Cliente
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </div>
                    </IonCol>
                    <IonCol>

                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default ClientContainer
