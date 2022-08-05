import { IonPage } from "@ionic/react"
import { LoginContainer } from "../../components/containers"
import { PassingData } from "../../interfaces/PassingData"

const LoginPage = ({setIsAuth}:PassingData) => {
    return (
        <IonPage>
            <LoginContainer setIsAuth={setIsAuth} />
        </IonPage>
    )
}

export default LoginPage
