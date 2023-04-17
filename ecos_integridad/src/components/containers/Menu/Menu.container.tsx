import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonTitle, IonToolbar } from "@ionic/react"
import { useHistory } from "react-router"
import { useContext } from "react"
import { AuthContext } from "../../../context/Auth.context"

const MenuContainer = () => {
    const {logout, isAuth} = useContext(AuthContext)
    const history = useHistory()
    const salir = () => {
        setTimeout(async () => {
            const response = await logout()
            if (response) {
                history.replace('/login')
            }
        }, 500);
    }
    return (
        <IonMenu disabled={!isAuth} contentId="main" /* type={'push'} */>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Menu Content</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    <IonMenuToggle>
                        <IonItem button onClick={salir}>
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
