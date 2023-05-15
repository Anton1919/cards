import BasePackModal from "common/components/ModalOverlay/BaseModals/BasePackModal/BasePackModal";
import {useAppDispatch} from "app/store";
import {updatePack} from "features/packs/packsReducer";
import {useState} from "react";

type PropsType = {
    packDeckCover: string
    packNameFromProps: string
    packId: string
    isOpen: boolean
    onClose: () => void
}

const EditPackModal = ({isOpen, onClose, packNameFromProps, packId, packDeckCover}: PropsType) => {
    const [packName, setPackName] = useState(packNameFromProps)
    const [privateStatus, setPrivateStatus] = useState(false)
    const [deckCover, setDeckCover] = useState(packDeckCover)
    const dispatch = useAppDispatch()

    const saveHandler = () => {
        onClose()
        dispatch(updatePack({cardsPack: {name: packName, _id: packId, private: privateStatus, deckCover}}))
    }

    return (
        <BasePackModal
            packsDeckCover={packDeckCover}
            setDeckCover={setDeckCover}
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
