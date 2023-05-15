import BasePackModal from "common/components/ModalOverlay/BaseModals/BasePackModal/BasePackModal";
import {useAppDispatch} from "app/store";
import {addPackTC} from "features/packs/packsReducer";
import {useState} from "react";

type PropsType = {
    isOpen: boolean
    onClose: () => void
}

const AddNewPackModal = ({isOpen, onClose}: PropsType) => {
    const [packName, setPackName] = useState('Enter pack name')
    const [deckCover, setDeckCover] = useState('')
    const [privateStatus, setPrivateStatus] = useState(false)

    const dispatch = useAppDispatch()

    const saveHandler = () => {
        onClose()
        dispatch(addPackTC({cardsPack: {name: packName, private: privateStatus, deckCover}}));

    }

    return (
        <BasePackModal
            setDeckCover={setDeckCover}
            packName={packName}
            title={'Add new Pack'}
            isOpen={isOpen}
            onClose={onClose}
            thunkCreator={saveHandler}
            setPackName={setPackName}
            privateStatus={privateStatus}
            setPrivateStatus={setPrivateStatus}
        />
    )
}

export default AddNewPackModal