import BaseCardModal from "common/components/ModalOverlay/BaseModals/BaseCardModal/BaseCardModal";
import {CardsType} from "features/cards/api/cardsAPI";
import {useState} from "react";
import {useAppDispatch} from "app/store";
import {updateCard} from "features/cards/cardsReducer";

type PropsType = {
    card: CardsType
    isOpen: boolean
    onClose: () => void
}

const EditCardModal = ({card, onClose, isOpen}: PropsType) => {
    const [question, setQuestion] = useState(card.question)
    const [answer, setAnswer] = useState(card.answer)
    const dispatch = useAppDispatch()

    const saveHandler = () => {
        dispatch(updateCard({cardId: card._id, question, answer}))
    }

    return (
        <BaseCardModal
            questionImg={card.questionImg}
            title={'Edit card'}
            question={question}
            answer={answer}
            isOpen={isOpen}
            onClose={onClose}
            setQuestion={setQuestion}
            setAnswer={setAnswer}
            thunkCreator={saveHandler}
        />
    )
}

export default EditCardModal