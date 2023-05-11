import React, {ChangeEvent, useState} from 'react';
import ModalOverlay from "common/components/ModalOverlay/ModalOverlay";
import s from './EditCardModal.module.scss'
import close from "assets/icons/close.svg";
import {SelectForModal} from "common/components/Select/SelectForModal/SelectForModal";
import Button from "common/components/Button/Button";
import {useAppDispatch} from "app/store";
import {useParams} from "react-router-dom";
import {addCard, updateCard} from "features/cards/cardsReducer";
import {updatePack} from "features/packs/packsReducer";

type EditCardModalType = {
    isOpen: boolean
    onClose: () => void
    cardId: string
    cardQuestion :string
    cardAnswer: string
}

const EditCardModal = ({isOpen, onClose, cardAnswer, cardId, cardQuestion}: EditCardModalType) => {
    const [editModeQuestion, setEditModeQuestion] = useState(false)
    const [editModeAnswer, setEditModeAnswer] = useState(false)
    const [question, setQuestion] = useState(cardQuestion)
    const [answer, setAnswer] = useState(cardAnswer)
    const dispatch = useAppDispatch()

    const onChangeModeQuestion = () => {
        setEditModeQuestion(!editModeQuestion)
    }
    const onChangeModeAnswer = () => {
        setEditModeAnswer(!editModeAnswer)
    }

    const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }

    const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    const onSaveHandler = () => {
        onClose()
        dispatch(updateCard({cardId, question, answer}))
    }

    return (
        <ModalOverlay isOpen={isOpen} onClose={onClose}>
            <div className={s.titleWrapper}>
                <div className={s.title}>
                    <h3>Edit Card</h3>
                </div>
                <div className={s.image} onClick={onClose}>
                    <img src={close} alt="close icon"/>
                </div>
            </div>

            <div className={s.chooseQuestion}>
                <span>Choose a question format</span>
                <SelectForModal/>
            </div>

            <div className={s.question}>
                <span>Question</span>
                {editModeQuestion
                    ? <input onBlur={onChangeModeQuestion} autoFocus type="text" value={question}
                             onChange={onChangeQuestion}/>
                    : <p onClick={onChangeModeQuestion}>{question}</p>
                }
            </div>

            <div className={s.answer}>
                <span>Answer</span>
                {editModeAnswer
                    ?
                    <input onBlur={onChangeModeAnswer} autoFocus type="text" value={answer} onChange={onChangeAnswer}/>
                    : <p onClick={onChangeModeAnswer}>{answer}</p>
                }
            </div>

            <div className={s.btnWrapper}>
                <div className={s.btn}>
                    <Button name={'Cancel'} variant={'transparent'} handler={onClose}/>
                </div>

                <div className={s.btn}>
                    <Button name={'Save'} variant={'primary'} handler={onSaveHandler}/>
                </div>
            </div>

        </ModalOverlay>
    );
};

export default EditCardModal;