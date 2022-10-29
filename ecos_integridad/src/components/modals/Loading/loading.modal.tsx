import { IonLoading, IonModal } from "@ionic/react"
import { useRef, useState } from "react"
import { Modal } from "../../../interfaces/Modal"

const LoadingModal = ({modal}: Modal) => {
    const modalData = useRef<HTMLIonModalElement>(modal)
    const [showLoading, setShowLoading] = useState(false);
    return (
        <IonModal ref={modalData}>
            <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
            />
        </IonModal>
    )
}

export default LoadingModal
