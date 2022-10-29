import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react"

const NoPermissionPage = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div style={{ textAlign: 'center', fontSize: 30, marginTop: 100 }}>
                    <p>Sin Permiso</p>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default NoPermissionPage
