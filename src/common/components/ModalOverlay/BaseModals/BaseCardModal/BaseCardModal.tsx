import React, {ChangeEvent, useEffect, useState} from 'react';
import ModalOverlay from "common/components/ModalOverlay/ModalOverlay";
import close from "assets/icons/close.svg";
import s from 'common/components/ModalOverlay/BaseModals/BaseCardModal/BaseCardModal.module.scss'
import {SelectForModal} from "common/components/Select/SelectForModal/SelectForModal";
import FieldError from "common/components/FieldError/FieldError";
import Button from "common/components/Button/Button";
import {onChange, onChangeMode} from "common/components/ModalOverlay/helpers/pureFunction";
import {onUpload} from "utils/uploadImage";
import {useAppDispatch} from "app/store";

type PropsType = {
    questionImg?: string
    setQuestionImg? : (value: string) => void
    title: string
    question: string
    answer: string
    isOpen: boolean
    onClose: () => void
    setQuestion: (e: string) => void
    setAnswer: (e: string) => void
    thunkCreator: () => void
}

const BaseCardModal = ({thunkCreator, questionImg, setQuestionImg, question, setQuestion, answer, setAnswer, title, isOpen, onClose}: PropsType) => {
    const [selectQuestion, setSelectQuestion] = useState('Text')
    const [uploadPictureQuestion, setUploadPictureQuestion] = useState(questionImg)
    const [editModeQuestion, setEditModeQuestion] = useState(false)
    const [editModeAnswer, setEditModeAnswer] = useState(false)
    const [errorQuestion, setErrorQuestion] = useState('')
    const [errorAnswer, setErrorAnswer] = useState('')
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (uploadPictureQuestion) {
            setQuestionImg?.(uploadPictureQuestion)
        }
    }, [uploadPictureQuestion])

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onUpload(e, setUploadPictureQuestion, dispatch)
    }

    const onChangeModeQuestion = () => {
        onChangeMode(question, setErrorQuestion, setEditModeQuestion, editModeQuestion)
    }

    const onChangeModeAnswer = () => {
        onChangeMode(answer, setErrorAnswer, setEditModeAnswer, editModeAnswer)
    }

    const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e, setErrorQuestion, setQuestion)
    }

    const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e, setErrorAnswer, setAnswer)
    }

    const onSaveHandler = () => {
        onClose()
        thunkCreator()
    }

    return (
        <ModalOverlay isOpen={isOpen} onClose={onClose}>
            <div className={s.titleWrapper}>
                <div className={s.title}>
                    <h3>{title}</h3>
                </div>
                <div className={s.image} onClick={onClose}>
                    <img src={close} alt="close icon"/>
                </div>
            </div>

            <div className={s.chooseQuestion}>
                <span>Choose a question format</span>
                <SelectForModal selectQuestion={selectQuestion} setSelectQuestion={setSelectQuestion}/>
            </div>

            {selectQuestion === 'Text'
                ? <div className={s.question}>
                    <span>Question</span>
                    {editModeQuestion
                        ? <input onBlur={onChangeModeQuestion} autoFocus type="text" value={question}
                                 onChange={onChangeQuestion}/>
                        : <p onClick={onChangeModeQuestion}>{question}</p>
                    }
                    {errorQuestion && <FieldError errorMessage={errorQuestion}/>}
                </div>

                : <div className={s.questionPictureBlock}>
                    <div className={s.chooseCover}>
                        <span>Question</span>
                        <label className={s.label}>
                            <a >Choose cover</a>
                            <input type="file" style={{display: 'none'}} onChange={uploadHandler}/>
                        </label>
                    </div>

                    <div className={s.questionPicture}>
                        {uploadPictureQuestion && <img src={uploadPictureQuestion} alt="default"/>}
                    </div>

                </div>
            }

            <div className={s.answer}>
                <span>Answer</span>
                {editModeAnswer
                    ?
                    <input onBlur={onChangeModeAnswer} autoFocus type="text" value={answer} onChange={onChangeAnswer}/>
                    : <p onClick={onChangeModeAnswer}>{answer}</p>
                }
                {errorAnswer && <FieldError errorMessage={errorAnswer}/>}
            </div>

            <div className={s.btnWrapper}>
                <div className={s.btn}>
                    <Button name={'Cancel'} variant={'transparent'} handler={onClose}/>
                </div>

                <div className={s.btn}>
                    <Button name={'Save'} variant={'primary'} handler={onSaveHandler}
                            disabled={!!errorAnswer || !!errorQuestion}/>
                </div>
            </div>

        </ModalOverlay>
    );
};

export default BaseCardModal;