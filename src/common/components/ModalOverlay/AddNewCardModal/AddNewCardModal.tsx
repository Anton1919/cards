import BaseCardModal from "common/components/ModalOverlay/BaseModals/BaseCardModal/BaseCardModal";
import {useState} from "react";
import {useAppDispatch} from "app/store";
import {addCard} from "features/cards/cardsReducer";
import {useParams} from "react-router-dom";

type PropsType = {
    isOpen: boolean
    onClose: () => void
}

const AddNewCardModal = ({isOpen, onClose}: PropsType) => {
    const [question, setQuestion] = useState('Enter your question')
    const [questionImg, setQuestionImg] = useState('')
    const [answer, setAnswer] = useState('Enter your answer')
    const dispatch = useAppDispatch()
    const {packID} = useParams()

    console.log(questionImg)

    const saveHandler = () => {
        dispatch(addCard({card: {cardsPack_id: packID, answer, question, questionImg: questionImg}}))
    }

    return (
        <BaseCardModal
            setQuestionImg={setQuestionImg}
            title={'Add new Card'}
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

export default AddNewCardModal