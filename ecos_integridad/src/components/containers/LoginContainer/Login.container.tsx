import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonList, IonRow, IonSpinner } from "@ionic/react"
import { useState } from "react"
import { eye } from 'ionicons/icons'
import { PassingData } from "../../../interfaces/PassingData"
import { useForm } from "react-hook-form";
import { LoginData } from "../../../interfaces/Login";
import axios from 'axios'
import { Usuario } from "../../../interfaces/Usuario";
import { useHistory } from "react-router";
import { authRouter } from "../../../router";

const LoginContainer = ({setIsAuth, setUserType, setUserRole}:PassingData) => {
    const { register, handleSubmit } = useForm<LoginData>()
    const [ passwordType, setPasswordType ] = useState<any>('password')
    const [ notLoading, setNotLoading ] = useState<boolean>(true)
    const history = useHistory()
    const login = async (data: LoginData) => {
        try {
            const userAgent = navigator.userAgent || navigator.vendor
            /* let typeHardware : string */
            if (/windows/i.test(userAgent)) {
                /* console.log(/windows/i.test(userAgent)) */
                /* typeHardware = "Windows" */
            }
            // Windows Phone must come first because its UA also contains "Android"
            if (/windows phone/i.test(userAgent)) {
                /* typeHardware = "Windows Phone" */
            }
    
            if (/android/i.test(userAgent)) {
                /* typeHardware = "Android" */
            }
    
            // iOS detection from: http://stackoverflow.com/a/9039885/177710
            if (/iPad|iPhone|iPod/.test(userAgent)/*  && !window.MSStream */) {
                /* typeHardware = "iOS" */
            }
            setNotLoading(false)
            const response: any = await authRouter.login(data)
            const user : Usuario = response.data.data
            console.log(user)
            const token : string = response.data.token
            window.localStorage.setItem('token', token)
            window.localStorage.setItem('usuario', JSON.stringify(user))
            if (user) {
                if ((user.subRoles && ((user.subRoles[0] === 'Supervisor')||(user.role === 'superAdmin')))&&((/windows/i.test(userAgent)))) {
                    if (user.subRoles) {
                        setUserType(user.subRoles[0])
                    } else {
                        setUserType('admin')
                    }
                    setUserRole(user.role)
                    setIsAuth(true)
                    setTimeout(() => {
                        setNotLoading(true)
                        history.push('/home')
                    }, 1000);
                } else {
                    setNotLoading(true)
                    alert('Las gestiones para su usuario deben ser desde un dispositivo de escritorio como PC o Notebook')
                }
            }
        } catch (error: any) {
            setNotLoading(true)
            alert(error.response.data.message)
        }
    }
    return (
        <IonContent>
            <IonGrid>
                <IonRow>
                    <IonCol>

                    </IonCol>
                    <IonCol sizeXs="12" sizeSm="12" sizeMd="8" sizeLg="4" sizeXl="3">
                        <div style={{ width: '70%', height: 200, margin: 'auto', marginTop: 50, marginBottom: 50 }}>
                            <img src={'../assets/images/logo/logo.png'} alt="" />
                        </div>
                        <form onSubmit={handleSubmit(login)}>
                            <IonItem>
                                <IonLabel position={'floating'} color={'primary'}>Email</IonLabel>
                                <IonInput
                                    required={true}
                                    type={'email'}
                                    {...register('email', {
                                        required: 'This is a required field',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: 'invalid email address'
                                        }
                                    })}
                                />
                            </IonItem>
                            <IonItem>
                                <IonLabel position={'floating'} color={'primary'}>Password</IonLabel>
                                <IonInput
                                    required={true}
                                    type={passwordType}
                                    {...register('password', {
                                        required: 'This is a required field'
                                    })}
                                />
                                <IonButton size={'default'} slot="end" fill={'clear'} onClick={() => {if (passwordType === 'password') {setPasswordType('text')} else {setPasswordType('password')}}}>
                                    <IonIcon icon={eye} />
                                </IonButton>
                            </IonItem>
                            <IonButton disabled={!notLoading} type={'submit'} expand={'block'}>
                                <IonSpinner hidden={notLoading} name="bubbles" style={{ marginRight: 10 }}/>Login
                            </IonButton>
                        </form>
                    </IonCol>
                    <IonCol>

                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default LoginContainer
