import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonLoading, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { AxiosResponse } from "axios"
import { arrowBack } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { format, validate } from "rut.js"
import { nuevoClienteCreado } from "../../../connections/socket.connection"
import { Cliente, Empresa } from "../../../interfaces/Cliente"
import { clientsRouter } from "../../../router"

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
    const [ latitud, setLatitud ] = useState<number>()
    const [ longitud, setLongitud ] = useState<number>()
    useEffect(() => {
      if (_id.id) {
        setShowLoading(true)
        obtenerCliente()
      }
    }, [])
    const obtenerCliente = async () => {
        const response : AxiosResponse = await clientsRouter.getClientById(_id.id)
        const empresa: Empresa = response.data.data.empresa
        setCorreoEmpresa(empresa.correo)
        setNombreEmpresa(empresa.nombre)
        setRunEmpresa(empresa.run)
        setFonoEmpresa(empresa.telefono)
        setDireccion(empresa.direccion ? empresa.direccion : '')
        empresa.ciudad && setCiudad(empresa.ciudad)
        empresa.region && setRegion(empresa.region)
        empresa.location?.lat && setLatitud(empresa.location?.lat)
        empresa.location?.lng && setLongitud(empresa.location?.lng)
        if (empresa) {
            setShowLoading(false)
        }
    }
    const crearCliente = async () => {
        if (validate(runEmpresa)) {
            const crearCliente: Cliente = {
                _id: null,
                empresa: {
                    nombre: nombreEmpresa,
                    run: runEmpresa,
                    telefono: fonoEmpresa,
                    correo: correoEmpresa,
                    ciudad: ciudad,
                    direccion: direccion,
                    region: region,
                    location: {
                        lat: latitud || 0,
                        lng: longitud || 0
                    }
                },
                habilitado: true,
                contratos: [],
                createdBy: JSON.parse(localStorage.getItem('usuario') || '{}')
            }
            const editarCliente : Cliente = {
                _id: _id.id,
                empresa: {
                    nombre: nombreEmpresa,
                    run: runEmpresa,
                    telefono: fonoEmpresa,
                    correo: correoEmpresa,
                    ciudad: ciudad,
                    direccion: direccion,
                    region: region,
                    location: {
                        lat: latitud || 0,
                        lng: longitud || 0
                    }
                },
                habilitado: true,
                contratos: [],
                createdBy: JSON.parse(localStorage.getItem('usuario') || '{}')
            }
            try {
                const response: AxiosResponse = await (_id.id ? clientsRouter.editClient(editarCliente) : clientsRouter.createClient(crearCliente))
                console.log(response)
                if (response) {
                    history.goBack()
                    nuevoClienteCreado()
                }
            } catch (error: any) {
                console.log(error)
            }
        } else {
            alert('Revise el rut ingresado. Formato no válido.')
        }
    }

    const setRunWithFormat = (value: string) => {
        console.log(format(value))
        if (value.length > 0) {
            setRunEmpresa(format(value))
        } else if (value === '-') {
            setRunEmpresa('')
        }
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
                        {_id.id ? 'Editar' : 'Enrolar Nuevo'} Cliente
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
                                            maxlength={12}
                                            name="run"
                                            value={format(runEmpresa)}
                                            type={'text'}
                                            onIonChange={(e: any) => {setRunWithFormat(e.target.value)}}
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
