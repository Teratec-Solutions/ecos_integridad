import { IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonRow } from "@ionic/react"
import { briefcase, list, logOut, map, options, peopleCircle } from "ionicons/icons"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { logout } from "../../../functions"

const HomeContainer = ({userType}:{userType: string}) => {
    const history = useHistory()
    const salir = async () => {
        const response = await logout()
        if (response) {
            history.replace('/login')
        }
    }
    useEffect(() => {
      console.log(userType)
    }, [])
    
    return (
        <IonContent className="bg-content">
            <IonGrid>
                <IonRow>
                    <IonCol sizeXl="3">
                        <div className="leftSideMenu">
                            <div className="leftSideMenuData">
                                <h1>Menu</h1>
                                <IonItem button style={{ borderRadius: 30 }} onClick={() => {history.push('/users')}}>
                                    <IonIcon slot="start" icon={peopleCircle} color={'primary'} />
                                    <IonLabel color={'primary'}>
                                        <strong>Lista de Usuarios</strong>
                                    </IonLabel>
                                </IonItem>
                                <IonItem button style={{ borderRadius: 30 }} onClick={() => {history.push('/clients')}}>
                                    <IonIcon slot="start" icon={briefcase} color={'primary'} />
                                    <IonLabel color={'primary'}>
                                        <strong>Lista de Clientes</strong>
                                    </IonLabel>
                                </IonItem>
                                <IonItem button style={{ borderRadius: 30 }} onClick={() => {history.push('/work-orders')}}>
                                    <IonIcon slot="start" icon={list} color={'primary'} />
                                    <IonLabel color={'primary'}>
                                        <strong>Lista de OT</strong>
                                    </IonLabel>
                                </IonItem>
                                <IonItem button style={{ borderRadius: 30 }}>
                                    <IonIcon slot="start" icon={map} color={'primary'} />
                                    <IonLabel color={'primary'}>
                                        <strong>Mapa</strong>
                                    </IonLabel>
                                </IonItem>
                                <IonItem button style={{ borderRadius: 30 }}>
                                    <IonIcon slot="start" icon={options} color={'primary'} />
                                    <IonLabel color={'primary'}>
                                        <strong>Opciones</strong>
                                    </IonLabel>
                                </IonItem>
                                <IonItem button style={{ borderRadius: 30 }} onClick={() => {salir()}}>
                                    <IonIcon slot="start" icon={logOut} color={'primary'} />
                                    <IonLabel color={'primary'}>
                                        <strong>Salir</strong>
                                    </IonLabel>
                                </IonItem>
                                <div style={{ position: 'absolute', bottom: 10, left: 0, width: '100%', textAlign: 'center' }}>
                                    <img src="./assets/images/logo/logo.png" width={100} />
                                </div>
                            </div>
                        </div>
                    </IonCol>
                    <IonCol sizeXs="12" sizeSm="12" sizeMd="8" sizeLg="6" sizeXl="4">
                        
                    </IonCol>
                    <IonCol sizeXl="5">

                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}

export default HomeContainer
