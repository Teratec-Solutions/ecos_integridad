import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react"
import axios, { AxiosResponse } from "axios"
import { arrowBack, eye, eyeOff } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { nuevoUsuarioCreado } from "../../../connections/socket.connection"
import { Usuario } from "../../../interfaces/Usuario"

const UserContainer = () => {
    const [ nombre, setNombre ] = useState<string>('')
    const [ apellido1, setApellido1 ] = useState<string>('')
    const [ apellido2, setApellido2 ] = useState<string>('')
    const [ run, setRun ] = useState<string>('')
    const [ fono, setFono ] = useState<string>('')
    const [ email, setEmail ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const [ role, setRole ] = useState<string>('')
    const [ typePassword, setTypePassword ] = useState<any>('password')
    const history = useHistory()
    const _id: {id: string} = useParams()
    console.log(_id)
    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        if (_id.id) {
            const data = await axios.post('/api/users/getUserById', {id: _id.id})
            if (data) {
                console.log(data.data.data)
                const usuario : Usuario = data.data.data
                setNombre(usuario.nombre)
                setApellido1(usuario.apellido1)
                setApellido2(usuario.apellido2)
                setRole(usuario.role)
                setRun(usuario.run)
                setFono(usuario.fono)
                setEmail(usuario.email)
            }
        }
    }
    
    const crearUsuario = async () => {
        const usuario = {
            nombre: nombre,
            apellido1: apellido1,
            apellido2: apellido2,
            run: run,
            fono: fono,
            role: role,
            email: email,
            password: password,
            estado: true
        } as Usuario
        const response: AxiosResponse = await axios.post('/api/users/createUser', usuario)
        if (response) {
            history.goBack()
            nuevoUsuarioCreado()
        }
    }
    return (
        <IonContent className="bg-content">
            <div className="titles">
                <IonToolbar style={{ borderRadius: 10 }}>
                    <IonButton slot="start" fill={'clear'} onClick={() => {history.goBack()}}>
                        <IonIcon icon={arrowBack} />
                    </IonButton>
                    <IonTitle>
                        Usuario
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
                                <IonCol sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="4" sizeXl="4">
                                    <IonItem>
                                        <IonLabel position={'floating'}>
                                            Nombre
                                        </IonLabel>
                                        <IonInput
                                            name="nombre"
                                            value={nombre}
                                            type={'text'}
                                            onIonChange={(e: any) => {setNombre(e.target.value)}}
                                        />
                                    </IonItem>
                                </IonCol>
                                <IonCol sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="4" sizeXl="4">
                                    <IonItem>
                                        <IonLabel position={'floating'}>
                                            Primer Apellido
                                        </IonLabel>
                                        <IonInput
                                            name="apellido1"
                                            value={apellido1}
                                            type={'text'}
                                            onIonChange={(e: any) => {setApellido1(e.target.value)}}
                                        />
                                    </IonItem>
                                </IonCol>
                                <IonCol sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="4" sizeXl="4">
                                    <IonItem>
                                        <IonLabel position={'floating'}>
                                            Segundo Apellido
                                        </IonLabel>
                                        <IonInput
                                            name="apellido2"
                                            value={apellido2}
                                            type={'text'}
                                            onIonChange={(e: any) => {setApellido2(e.target.value)}}
                                        />
                                    </IonItem>
                                </IonCol>
                                <IonCol sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="4" sizeXl="4">
                                    <IonItem>
                                        <IonLabel position={'floating'}>
                                            RUN
                                        </IonLabel>
                                        <IonInput
                                            name="run"
                                            value={run}
                                            type={'text'}
                                            onIonChange={(e: any) => {setRun(e.target.value)}}
                                        />
                                    </IonItem>
                                </IonCol>
                                <IonCol sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="4" sizeXl="4">
                                    <IonItem>
                                        <IonLabel position={'floating'}>
                                            Teléfono
                                        </IonLabel>
                                        <IonInput
                                            name="telefono"
                                            value={fono}
                                            type={'tel'}
                                            onIonChange={(e: any) => {setFono(e.target.value)}}
                                        />
                                    </IonItem>
                                </IonCol>
                                <IonCol sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="4" sizeXl="4">
                                    <IonItem>
                                        <IonLabel position={'floating'}>
                                            Tipo de usuario
                                        </IonLabel>
                                        <IonSelect value={role} interface={'popover'} onIonChange={(e: any) => {setRole(e.target.value)}}>
                                            <IonSelectOption value={'admin'}>Administrador</IonSelectOption>
                                            <IonSelectOption value={'usuario'}>Usuario</IonSelectOption>
                                        </IonSelect>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="6" sizeXl="6">
                                    <IonItem>
                                        <IonLabel position={'floating'}>
                                            Email
                                        </IonLabel>
                                        <IonInput
                                            name="email"
                                            value={email}
                                            type={'email'}
                                            onIonChange={(e: any) => {setEmail(e.target.value)}}
                                        />
                                    </IonItem>
                                </IonCol>
                                <IonCol sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="6" sizeXl="6">
                                    <IonItem>
                                        <IonLabel position={'floating'}>
                                            Password
                                        </IonLabel>
                                        <IonInput
                                            name="password"
                                            value={password}
                                            type={typePassword}
                                            onIonChange={(e: any) => {setPassword(e.target.value)}}
                                        />
                                        <IonButton size={'default'} slot="end" fill={'clear'} onClick={() => {(typePassword === 'password') ? setTypePassword('text') : setTypePassword('password')}}>
                                            <IonIcon icon={(typePassword === 'password') ? eye : eyeOff} />
                                        </IonButton>
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
                                    <IonButton expand={'block'} onClick={() => {crearUsuario()}}>
                                        Crear Usuario
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

export default UserContainer