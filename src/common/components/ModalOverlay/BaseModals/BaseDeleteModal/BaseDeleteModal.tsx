import React from 'react';
import ModalOverlay from "common/components/ModalOverlay/ModalOverlay";
import s from "common/components/ModalOverlay/DeleteCardModal/DeleteCardModal.module.scss";
import close from "assets/icons/close.svg";
import Button from "common/components/Button/Button";

type PropsType = {
    packOrCardName: string
    isOpen: boolean
    onClose: (value: boolean) => void
    thunkCreator: () => void
    title: string
}

const BaseDeleteModal = ({isOpen, onClose, title, thunkCreator, packOrCardName}: PropsType) => {
    const closeHandler = () => {
        onClose(false)
    }

    const deleteHandler = () => {
        onClose(false)
        thunkCreator()
    };

    return (
        <ModalOverlay isOpen={isOpen} onClose={closeHandler}>
            <div className={s.titleWrapper}>
                <div className={s.title}>
                    <h3>{title}</h3>
                </div>
                <div className={s.image} onClick={closeHandler}>
                    <img src={close} alt="close icon"/>
                </div>
            </div>

            <div className={s.message}>
                <p>
                    Do you really want to remove <b>{packOrCardName}</b>?
                    All cards will be deleted.
                </p>
            </div>

            <div className={s.btnWrapper}>
                <div className={s.btn}>
                    <Button name={'Cancel'} variant={'transparent'} handler={closeHandler}/>
                </div>
                <div className={s.btn}>
                    <Button name={'Delete'} variant={'danger'} handler={deleteHandler}/>
                </div>
            </div>
        </ModalOverlay>
    );
};

export default BaseDeleteModal;