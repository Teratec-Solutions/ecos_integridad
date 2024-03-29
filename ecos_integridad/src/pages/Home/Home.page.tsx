import { IonPage } from "@ionic/react"
import { HomeContainer, HomeUserContainer } from "../../components/containers"

const HomePage = ({userType}:{userType: string | undefined}) => {
    return (
        <IonPage>
            {(userType === 'Operador') ? <HomeUserContainer userType={userType} /> : <HomeContainer />}
        </IonPage>
    )
}

export default HomePage