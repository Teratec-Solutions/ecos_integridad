import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonList, IonRow } from "@ionic/react"
import { useState } from "react"
import { eye } from 'ionicons/icons'
import { PassingData } from "../../../interfaces/PassingData"
import { useForm } from "react-hook-form";
import { LoginData } from "../../../interfaces/Login";
import axios from 'axios'
import { Usuario } from "../../../interfaces/Usuario";
import { useHistory } from "react-router";

const LoginContainer = ({setIsAuth}:PassingData) => {
    const { register, handleSubmit } = useForm<LoginData>()
    const [ passwordType, setPasswordType ] = useState<any>('password')
    const history = useHistory()
    const login = async (data: LoginData) => {
        try {
            const response: any = await axios.post('/api/login', data)
            const user : Usuario = response.data.data
            console.log(user)
            const token : string = response.data.token
            window.localStorage.setItem('token', token)
            window.localStorage.setItem('usuario', JSON.stringify(user))
            if (user) {
                setIsAuth(true)
                history.push('/home')
            }
        } catch (error) {
            console.log(error)
            alert('Un error en el login ha ocurrido')
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
                            <IonButton type={'submit'} expand={'block'}>
                                Login
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
