import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonLoading, IonRow, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar } from "@ionic/react"
import { AxiosResponse } from "axios"
import { arrowBack, eye, eyeOff } from "ionicons/icons"
import { format, validate } from 'rut.js'
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { nuevoUsuarioCreado } from "../../../connections/socket.connection"
import { Usuario } from "../../../interfaces/Usuario"
import { usersRouter } from "../../../router"

const UserContainer = () => {
    const [ nombre, setNombre ] = useState<string>()
    const [ apellido1, setApellido1 ] = useState<string>()
    const [ apellido2, setApellido2 ] = useState<string>()
    const [ run, setRun ] = useState<string>()
    const [ fono, setFono ] = useState<string>()
    const [ email, setEmail ] = useState<string>()
    const [ password, setPassword ] = useState<string>()
    const [ role, setRole ] = useState<string>()
    const [ subRoles, setSubRoles ] = useState<string[]>([])
    const [ typePassword, setTypePassword ] = useState<any>('password')
    const [ showLoading, setShowLoading ] = useState<boolean>(false)
    const [ estado, setEstado ] = useState<boolean>(true)
    const history = useHistory()
    const _id: {id: string} = useParams()
    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        try {
            if (_id.id) {
                setShowLoading(true)
                const response: AxiosResponse = await usersRouter.getUserById(_id)/* axios.post('/api/users/getUserById', {id: _id.id}) */
                if (response) {
                    console.log(response.data.data)
                    const usuario : Usuario = response.data.data
                    setNombre(usuario.nombre)
                    setApellido1(usuario.apellido1)
                    setApellido2(usuario.apellido2)
                    setRole(usuario.role)
                    setRun(usuario.run)
                    setFono(usuario.fono)
                    setEmail(usuario.email)
                    setShowLoading(false)
                    setEstado(usuario.estado ? usuario.estado : false)
                    setSubRoles(usuario.subRoles ? usuario.subRoles : [])
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const setRunWithFormat = (value: string) => {
        console.log(format(value))
        if (value.length > 0) {
            setRun(format(value))
        } else if (value === '-') {
            setRun('')
        }
    }
    
    const crearUsuario = async () => {
        if (validate(run ? run : '')) {
            if (subRoles.length === 0) {
                alert('Debe seleccionar el tipo de usuario')
            } else {
                const createUser = {
                    nombre: nombre,
                    apellido1: apellido1,
                    apellido2: apellido2,
                    run: run,
                    fono: fono,
                    role: role,
                    email: email,
                    password: password,
                    estado: true,
                    subRoles: subRoles
                } as Usuario
                const editUser = {
                    _id: _id.id,
                    nombre: nombre,
                    apellido1: apellido1,
                    apellido2: apellido2,
                    run: run,
                    fono: fono,
                    role: role,
                    email: email,
                    estado: estado,
                    subRoles: subRoles
                } as Usuario
                try {
                    const usuario = _id.id ? editUser : createUser 
                    const response: AxiosResponse = await (_id.id ? usersRouter.editUser(usuario) : usersRouter.createUser(usuario))/* await axios.post(`/api/users/${_id.id ? 'editUser' : 'createUser'}`, usuario) */
                    if (response) {
                        history.goBack()
                        nuevoUsuarioCreado()
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        } else {
            alert('Revise el rut ingresado. Formato no válido.')
        }
    }
    return (
        <IonContent className="bg-content">
            <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                /* onDidDismiss={() => setShowLoading(false)} */
                message={'Cargando datos...'}
                /* duration={5000} */
            />
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
                                            value={format(run ? run : '')}
                                            type={'text'}
                                            onIonChange={(e: any) => {setRunWithFormat(e.target.value)}}
                                        />
                                    </IonItem>
                                </IonCol>
                                <IonCol sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="4" sizeXl="4">
                                    <IonItem>
                                        <IonLabel position={'floating'}>
                                            Sub Rol
                                        </IonLabel>
                                        <IonSelect value={subRoles} interface={'popover'} multiple onIonChange={(e: any) => {setSubRoles(e.target.value)}}>
                                            <IonSelectOption value={'Supervisor'}>Supervisor</IonSelectOption>
                                            <IonSelectOption value={'Operador'}>Operador</IonSelectOption>
                                        </IonSelect>
                                        {/* <IonInput
                                            name="telefono"
                                            value={fono}
                                            type={'tel'}
                                            onIonChange={(e: any) => {setFono(e.target.value)}}
                                        /> */}
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
                                <IonCol sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="4" sizeXl="4">
                                    <IonItem hidden={_id.id ? false : true}>
                                        <IonLabel position={'floating'}>
                                            Estado
                                        </IonLabel>
                                        <IonSelect value={estado} interface={'popover'} onIonChange={(e: any) => {setEstado(e.target.value)}}>
                                            <IonSelectOption value={true}>Activado</IonSelectOption>
                                            <IonSelectOption value={false}>Desactivado</IonSelectOption>
                                        </IonSelect>
                                    </IonItem>
                                    <IonItem hidden={_id.id ? true : false}>
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
                                        {_id.id ? 'Editar' : 'Crear'} Usuario
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