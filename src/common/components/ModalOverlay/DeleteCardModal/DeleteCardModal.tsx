import React from 'react';
import ModalOverlay from "common/components/ModalOverlay/ModalOverlay";
import s from './DeleteCardModal.module.scss'
import close from "assets/icons/close.svg";
import Button from "common/components/Button/Button";
import {useAppDispatch} from "app/store";
import {deleteCard} from "features/cards/cardsReducer";

type DeleteModalType = {
    cardId: string
    cardName: string
    isOpen: boolean
    onClose: (value: boolean) => void
}

const DeleteCardModal = ({isOpen, onClose, cardId, cardName}: DeleteModalType) => {
    const dispatch = useAppDispatch();

    const closeHandler = () => {
        onClose(false)
    }

    const deleteCardHandler = () => {
        onClose(false)
        dispatch(deleteCard(cardId))
    };

    return (
        <ModalOverlay isOpen={isOpen} onClose={closeHandler}>
            <div className={s.titleWrapper}>
                <div className={s.title}>
                    <h3>Delete Card</h3>
                </div>
                <div className={s.image} onClick={closeHandler}>
                    <img src={close} alt="close icon"/>
                </div>
            </div>

            <div className={s.message}>
                <p>
                    Do you really want to remove <b>{cardName}</b>?
                    All cards will be deleted.
                </p>
            </div>

            <div className={s.btnWrapper}>
                <div className={s.btn}>
                    <Button name={'Cancel'} variant={'transparent'} handler={closeHandler}/>
                </div>
                <div className={s.btn}>
                    <Button name={'Delete'} variant={'danger'} handler={deleteCardHandler}/>
                </div>
            </div>

        </ModalOverlay>
    );
};

export default DeleteCardModal;