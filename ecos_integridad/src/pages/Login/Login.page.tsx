import { IonPage } from "@ionic/react"
import { LoginContainer } from "../../components/containers"
import { PassingData } from "../../interfaces/PassingData"

const LoginPage = ({setIsAuth, setUserType, setUserRole}:PassingData) => {
    return (
        <IonPage>
            <LoginContainer setIsAuth={setIsAuth} setUserType={setUserType} setUserRole={setUserRole} />
        </IonPage>
    )
}

export default LoginPage
