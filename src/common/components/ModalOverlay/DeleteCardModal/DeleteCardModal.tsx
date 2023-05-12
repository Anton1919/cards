import BaseDeleteModal from "common/components/ModalOverlay/BaseModals/BaseDeleteModal/BaseDeleteModal";
import {useAppDispatch} from "app/store";
import {deleteCard} from "features/cards/cardsReducer";

type PropsType = {
    cardName: string
    cardId: string
    isOpen: boolean
    onClose: (value: boolean) => void
}

const DeleteCardModal = ({cardId, cardName, isOpen, onClose}: PropsType) => {
    const dispatch = useAppDispatch();

    const deleteCardHandler = () => {
        onClose(false)
        dispatch(deleteCard(cardId))
    }

    return (
        <BaseDeleteModal
            packOrCardName={cardName}
            isOpen={isOpen}
            onClose={onClose}
            thunkCreator={deleteCardHandler}
            title={'Delete Card'}
        />
    )
}

export default DeleteCardModal