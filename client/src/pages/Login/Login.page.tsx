import { IonPage } from "@ionic/react"
import { LoginContainer } from "../../components/containers"
import { PassingData } from "../../interfaces/PassingData"

const LoginPage = ({setIsAuth, setUserType}:PassingData) => {
    return (
        <IonPage>
            <LoginContainer setIsAuth={setIsAuth} setUserType={setUserType} />
        </IonPage>
    )
}

export default LoginPage
