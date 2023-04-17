import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonIcon, IonLabel, IonRow } from "@ionic/react"
import { briefcase, list, peopleCircle } from "ionicons/icons"
import { useContext } from "react"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../../../context/Auth.context"

const HomeContainer = () => {
    const {logout, usuario} = useContext(AuthContext)
    const history = useHistory()
    const salir = async () => {
        if(window.confirm('Confirme que saldrá del sistema')) {
            const response = await logout()
            if (response) {
                history.replace('/login')
            }
        }
    }

    return (
        <IonContent className="bg-content-home">
            <IonGrid>
                <IonRow>
                    <IonCol sizeXl="3" sizeLg="4" sizeMd="4" sizeSm="12" sizeXs="12">
                        <div className="leftSideMenu">
                            <div className="leftSideMenuData">
                                <div className="leftSideMenuContainer">
                                    <img src="./assets/images/profile/profile_default.png" className="profileHomeImage" alt="" />
                                    <h2>{usuario?.nombre} {usuario?.apellido1}</h2>
                                    <h4>{(usuario?.subRoles?.length === 1) ? usuario.subRoles[0] : 'Super Administrador'}</h4>
                                    {/* <h4>{usuario?.role}</h4> */}
                                    <br />
                                    <IonButton shape={'round'} fill={'solid'} onClick={salir}>
                                        Cerrar Sesión
                                    </IonButton>
                                </div>
                                <div style={{ position: 'absolute', bottom: 10, left: 0, width: '100%', textAlign: 'center' }}>
                                    <img src="./assets/images/logo/logo.png" width={200} alt={'logo'} />
                                </div>
                            </div>
                        </div>
                    </IonCol>
                    <IonCol sizeXl="9" sizeLg="8" sizeMd="8">
                        <div className="leftSideMenu">
                            <div className="homeContainer">
                                <div
                                   className="separationTopHomeContainer"
                                >

                                </div>
                                <IonRow>
                                    <IonCol sizeXl="1.5" sizeLg="1" sizeMd="1"></IonCol>
                                    <IonCol sizeXl="3" sizeLg="3" sizeMd="3">
                                        <IonCard
                                            disabled={(usuario?.role === 'usuario') ? true : false}
                                            onClick={() => {history.push('/users')}}
                                            button
                                            className="homeContainerButton"
                                        >
                                            <IonIcon 
                                                className="homeContainerButtonIcon"
                                                color="primary" icon={peopleCircle} />
                                            <br />
                                            <IonLabel
                                                color={'primary'}
                                                className="homeContainerButtonLabel"
                                            >
                                                Usuarios
                                            </IonLabel>
                                            <br />
                                        </IonCard>
                                    </IonCol>
                                    <IonCol sizeXl="3">
                                        <IonCard
                                            onClick={() => {history.push('/clients')}}
                                            button
                                            className="homeContainerButton"
                                        >
                                            <IonIcon 
                                                className="homeContainerButtonIcon"
                                                color="primary" icon={briefcase} />
                                            <br />
                                            <IonLabel
                                                color={'primary'}
                                                className="homeContainerButtonLabel"
                                            >
                                                Clientes
                                            </IonLabel>
                                        </IonCard>
                                    </IonCol>
                                    <IonCol sizeXl="3">
                                        <IonCard
                                            onClick={() => {history.push('/work-orders')}}
                                            button
                                            className="homeContainerButton"
                                        >
                                            <IonIcon 
                                                className="homeContainerButtonIcon"
                                                color="primary" icon={list} />
                                            <br />
                                            <IonLabel
                                                color={'primary'}
                                                className="homeContainerButtonLabel"
                                            >
                                                Ordenes
                                            </IonLabel>
                                        </IonCard>
                                    </IonCol>
                                    <IonCol sizeXl="1.5"></IonCol>
                                </IonRow>
                            </div>
                        </div>
                    </IonCol>
                </IonRow>
            </IonGrid>
            
        </IonContent>
    )
}

export default HomeContainer
