import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonMenuToggle, IonRow, IonTitle, IonToolbar } from '@ionic/react'
import { menu } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Usuario } from '../../../interfaces/Usuario'
import { FirmaModal } from '../../modals'

const HomeUserContainer = ({userType}:{userType: string | undefined}) => {
    const [userData, setUserData] = useState<Usuario>()
    const [openFirmaModal, setOpenFirmaModal] = useState<boolean>(false)
    const history = useHistory() 
    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem('usuario')||'{}'))
        const uData : Usuario = JSON.parse(localStorage.getItem('usuario')||'{}')
        if (!uData.firma) {
            setOpenFirmaModal(true)
        }
    }, [])
    /* useEffect(() => {
        if (!userData?.firma) {
            setOpenFirmaModal(true)
        }
    },[userData]) */
    const closeFirmaModal = () => {
        setOpenFirmaModal(false)
    }
    return (
        <IonContent>
            <FirmaModal open={openFirmaModal} close={closeFirmaModal}/>
            <IonHeader className='ion-no-border'>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuToggle>
                            <IonButton>
                                <IonIcon slot="icon-only" icon={menu} />
                            </IonButton>
                        </IonMenuToggle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <div
                style={
                    {
                        position: 'relative',
                        marginTop: 50,
                        marginRight: 20,
                        marginLeft: 20,
                        height: 200
                    }
                }
            >
                <img
                    src={userData?.imagenPerfil ? userData?.imagenPerfil : '../assets/images/profile/profile_default.png'}
                    height={100}
                    style={
                        {
                            borderRadius: '50%',
                            position: 'absolute',
                            zIndex: 2
                        }
                    }
                />
                <div
                    style={
                        {
                            width: '100%',
                            borderRadius: 20,
                            height: 150,
                            marginTop: 30,
                            position: 'absolute',
                            zIndex: 1
                        }
                    }
                    >
                    <div
                        style={
                            {
                                width: '100%',
                                textAlign: 'right',
                                fontSize: 18,
                                height: 30,
                                paddingRight: 10
                            }
                        }
                    >
                        <p
                            style={
                                {

                                }
                            }
                        >
                            <strong>{userData?.nombre} {userData?.apellido1}</strong>
                        </p>
                    </div>
                    <div
                        style={
                            {
                                width: '100%',
                                borderRadius: 4,
                                backgroundColor: '#ccc',
                                height: 110,
                                position: 'absolute',
                                zIndex: 1,
                                textAlign: 'center',
                                padding: 10
                            }
                        }
                    >
                        <p
                            style={
                                {
                                    color: 'white'
                                }
                            }
                        >
                            <strong>{userData?.email}</strong>
                        </p>
                        <p
                            style={
                                {
                                    color: 'white'
                                }
                            }
                        >
                            <strong>{userData?.subRoles}</strong>
                        </p>
                    </div>
                </div>
            </div>
            <div style={
                {
                    position: 'relative'
                }
            }>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonCard 
                                button
                                onClick={() => {history.push('/work-orders-user')}}
                                style={
                                    {
                                        paddingTop: 30,
                                        paddingBottom: 30,
                                        textAlign: 'center',
                                        fontSize: 20
                                    }
                                }
                            >
                                <IonLabel>
                                    Mis OTs
                                </IonLabel>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>
        </IonContent>
    )
}

export default HomeUserContainer
