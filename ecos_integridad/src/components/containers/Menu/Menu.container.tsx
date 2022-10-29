import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonTitle, IonToolbar } from "@ionic/react"
import { useHistory } from "react-router"
import { logout } from "../../../functions"

const MenuContainer = () => {
    const history = useHistory()
    const salir = async () => {
        const response = await logout()
        if (response) {
            history.replace('/login')
        }
    }
    return (
        <IonMenu contentId="main" type={'push'}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Menu Content</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    <IonMenuToggle>
                        <IonItem button onClick={() => { salir() }}>
                            <IonLabel>
                                Salir
                            </IonLabel>
                        </IonItem>
                    </IonMenuToggle>
                </IonList>    
            </IonContent>
        </IonMenu>
    )
}

export default MenuContainer
