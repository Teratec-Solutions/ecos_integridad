import { IonPage } from "@ionic/react"
import { HomeContainer } from "../../components/containers"

const HomePage = ({userType}:{userType: string}) => {
    return (
        <IonPage>
            <HomeContainer userType={userType} />
        </IonPage>
    )
}

export default HomePage