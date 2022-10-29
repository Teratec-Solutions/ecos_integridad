import { IonButton, IonContent, IonModal } from '@ionic/react'
import { useState } from 'react'
import { Usuario } from '../../../interfaces/Usuario'
import { usersRouter } from '../../../router'
import { FirmaCanvas } from '../../containers'
import SignatureCanvas from 'react-signature-canvas'

const FirmaModal = ({open, close}:{open: boolean, close: () => void}) => {
    const [firma, setFirma] = useState<string|undefined>()
    const setRefCanvas = (e: SignatureCanvas | null) => {
        setFirma(e?.toDataURL())
    }
    const guardarFirma = async () => {
        const userData: Usuario = JSON.parse(localStorage.getItem('usuario') || '{}')
        const user = {
            _id: userData._id,
            firma: firma
        } as Usuario
        const response = await usersRouter.editUser(user)
        console.log(response)
        if (response)
        close()
    }
    return (
        <IonModal
            isOpen={open}
        >
            <IonContent>
                <FirmaCanvas setRefCanvas={setRefCanvas} />
                <IonButton expand={'full'} onClick={guardarFirma}>
                    Guardar Firma
                </IonButton>
            </IonContent>
        </IonModal>
    )
}

export default FirmaModal
