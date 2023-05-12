import BasePackModal from "common/components/ModalOverlay/BaseModals/BasePackModal/BasePackModal";
import {PackType} from "features/packs/api/packsAPI";
import {useAppDispatch} from "app/store";
import {updatePack} from "features/packs/packsReducer";
import {useState} from "react";

type PropsType = {
    packs: PackType
    isOpen: boolean
    onClose: () => void
}

const EditPackModal = ({isOpen, onClose, packs}: PropsType) => {
    const [packName, setPackName] = useState(packs.name)
    const [privateStatus, setPrivateStatus] = useState(false)
    const dispatch = useAppDispatch()

    const saveHandler = () => {
        onClose()
        dispatch(updatePack({cardsPack: {name: packName, _id: packs._id, private: privateStatus, deckCover: ''}}))
    }

    return (
        <BasePackModal
            packName={packName}
            title={'Edit Pack'}
            isOpen={isOpen}
            onClose={onClose}
            thunkCreator={saveHandler}
            setPackName={setPackName}
            privateStatus={privateStatus}
            setPrivateStatus={setPrivateStatus}
        />
    )
}

export default EditPackModal
