import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonSpinner } from "@ionic/react"
import { useContext, useState } from "react"
import { eye } from 'ionicons/icons'
import { useForm } from "react-hook-form";
import { LoginData } from "../../../interfaces/Login";
import { AuthContext } from "../../../context/Auth.context";
import { useHistory } from "react-router";

const LoginContainer = (/* {setIsAuth, setUserType, setUserRole}:PassingData */) => {
    const { login, loading } = useContext(AuthContext)
    const { register, handleSubmit } = useForm<LoginData>()
    const [ passwordType, setPasswordType ] = useState<any>('password')
    const history = useHistory()
    /* const [ notLoading, setNotLoading ] = useState<boolean>(true) */
    const iniciarSesion = async (e: any) => {
        const response = await login(e)
        if (response) {
            history.replace('/home')
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
                        <form onSubmit={handleSubmit(iniciarSesion)}>
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
                            <IonButton disabled={loading} type={'submit'} expand={'block'}>
                                <IonSpinner hidden={!loading} name="bubbles" style={{ marginRight: 10 }}/>Login
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
