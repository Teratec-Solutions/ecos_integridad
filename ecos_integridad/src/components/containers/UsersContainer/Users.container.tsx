import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonRow, IonSpinner, IonTitle, IonToolbar } from "@ionic/react"
import { arrowBack, eye, pencil, trash } from "ionicons/icons"
import { useContext, useState } from "react"
import { useHistory } from "react-router"
import { getDateWithTime, nombreRole } from "../../../functions"
import { Usuario } from "../../../interfaces/Usuario"
import { UserModal } from "../../modals"
import { UsersContext } from "../../../context/Users.context"
import { usuarioEliminado } from "../../../connections/socket.connection"
import { AuthContext } from "../../../context/Auth.context"

const UsersContainer = () => {
    const {users, loading, deleteUser} = useContext(UsersContext)
    const {usuario} = useContext(AuthContext)
    const [openUserModal, setOpenUserModal] = useState<boolean>(false)
    const [userToUserModal, setUserToUserModal] = useState<Usuario>()
    const history = useHistory()
    const closeUsuarioModal = () => {
        setOpenUserModal(false)
    }
    const openUsuarioData = async (usuario: Usuario) => {
        setOpenUserModal(true)
        setUserToUserModal(usuario)
    }
    const removeUser = async (userId: string) => {
        const response = await deleteUser(userId)
        if (response && usuario) {
            usuarioEliminado(usuario)
        }
    }
    return (
        <IonContent className="bg-content">
            <UserModal isOpen={openUserModal} usuario={userToUserModal} closeModal={closeUsuarioModal} />
            <div className="titles">
                <IonToolbar style={{ borderRadius: 10 }}>
                    <IonButton slot="start" fill={'clear'} onClick={() => {history.goBack()}}>
                        <IonIcon icon={arrowBack} />
                    </IonButton>
                    <IonTitle>
                        Listado de Usuarios
                    </IonTitle>
                    <IonButton slot="end" onClick={() => {history.push('/user')}}>
                        Nuevo Usuario
                    </IonButton>
                </IonToolbar>
            </div>
            <div className="bg-content-users">
                <IonGrid style={{ textAlign: 'center' }}>
                    <IonRow>
                        <IonCol size="0.5" className="tabla tabla-inicial">
                            <p style={{ textAlign: 'center' }}></p>
                        </IonCol>
                        <IonCol size="2" className="tabla">
                            <p style={{ textAlign: 'center'}}><strong>Nombre y Apellido</strong></p>
                        </IonCol>
                        <IonCol size="1" className="tabla">
                            <p style={{ textAlign: 'center'}}><strong>RUN</strong></p>
                        </IonCol>
                        <IonCol size="1" className="tabla">
                            <p style={{ textAlign: 'center'}}><strong>Tipo de usuario</strong></p>
                        </IonCol>
                        <IonCol size="1" className="tabla">
                            <p style={{ textAlign: 'center'}}><strong>Roles</strong></p>
                        </IonCol>
                        <IonCol size="1" className="tabla">
                            <p style={{ textAlign: 'center'}}><strong>Estado</strong></p>
                        </IonCol>
                        <IonCol size="1" className="tabla">
                            <p style={{ textAlign: 'center'}}><strong>Fono contacto</strong></p>
                        </IonCol>
                        <IonCol size="1.5" className="tabla">
                            <p style={{ textAlign: 'center'}}><strong>Email contacto</strong></p>
                        </IonCol>
                        <IonCol size="1" className="tabla">
                            <p style={{ textAlign: 'center'}}><strong>Fecha de creación</strong></p>
                        </IonCol>
                        <IonCol size="2" className="tabla tabla-final">
                            <p style={{ textAlign: 'center'}}></p>
                        </IonCol>
                    </IonRow>
                    <IonSpinner hidden={!loading} name="bubbles"/>
                    {
                        users.map((usuario, index) => {
                            return (
                                <IonRow key={index}>
                                    <IonCol size="0.5" className="tabla center">
                                        <img src={`${usuario.imagenPerfil ? usuario.imagenPerfil : '../assets/images/profile/profile_default.png'}`} alt='profile' height={40} style={{ borderRadius: '50%' }} />
                                    </IonCol>
                                    <IonCol size="2" className="tabla">
                                        <p style={{ textAlign: 'center'}}>{usuario.nombre} {usuario.apellido1}</p>
                                    </IonCol>
                                    <IonCol size="1" className="tabla">
                                        <p style={{ textAlign: 'center'}}>{usuario.run}</p>
                                    </IonCol>
                                    <IonCol size="1" className="tabla">
                                        <p style={{ textAlign: 'center'}}>{nombreRole(usuario.role ? usuario.role : '')}</p>
                                    </IonCol>
                                    <IonCol size="1" className="tabla">
                                        <p style={{ textAlign: 'center'}}>{usuario.subRoles}</p>
                                    </IonCol>
                                    <IonCol size="1" className="tabla" style={{ textAlign: 'center' }}>
                                        <p style={{ color: usuario.estado ? 'green' : 'red' }}><strong>{usuario.estado ? 'Activado' : 'Desactivado'}</strong></p>
                                    </IonCol>
                                    <IonCol size="1" className="tabla">
                                        <p style={{ textAlign: 'center'}}>{usuario.fono}</p>
                                    </IonCol>
                                    <IonCol size="1.5" className="tabla">
                                        <p style={{ textAlign: 'center'}}>{usuario.email}</p>
                                    </IonCol>
                                    <IonCol size="1" className="tabla">
                                        <p style={{ textAlign: 'center'}}>{getDateWithTime(usuario.createdAt)}</p>
                                    </IonCol>
                                    <IonCol size="2" className="tabla" style={{ textAlign: 'center' }}>
                                        <IonButton fill={'clear'} onClick={() => {openUsuarioData(usuario)}}>
                                            <IonIcon icon={eye} />
                                        </IonButton>
                                        <IonButton fill={'clear'} onClick={() => {history.push(`/user/${usuario._id}`)}} disabled={(usuario.role === "superAdmin") ? true : false}>
                                            <IonIcon icon={pencil} />
                                        </IonButton>
                                        <IonButton fill={'clear'} onClick={() => {removeUser(usuario._id)}} color={'danger'} disabled={(usuario.role === "superAdmin") ? true : false}>
                                            <IonIcon icon={trash} />
                                        </IonButton>
                                    </IonCol>
                                </IonRow>
                            )
                        })
                    }
                    {
                        (users.length === 0) && <div style={{ textAlign: 'center', width: '100%' }}>
                            <p hidden={loading}><strong>No hay usuarios</strong></p>
                        </div>
                    }
                </IonGrid>
            </div>
        </IonContent>
    )
}

export default UsersContainer
