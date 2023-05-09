import React from 'react';
import ModalOverlay from "common/components/ModalOverlay/ModalOverlay";
import s from './DeletePackModal.module.scss'
import close from "assets/icons/close.svg";
import Button from "common/components/Button/Button";
import {useAppDispatch} from "app/store";
import {deletePack} from "features/packs/packsReducer";

type DeleteModalType = {
    packId: string
    isOpen: boolean
    onClose: (value: boolean) => void
}

const DeletePackModal = ({isOpen, onClose, packId}: DeleteModalType) => {
    const dispatch = useAppDispatch();

    const closeHandler = () => {
        onClose(false)
    }

    const deletePackHandler = () => {
        onClose(false)
        dispatch(deletePack(packId));
    };

    return (
        <ModalOverlay isOpen={isOpen} onClose={closeHandler}>
            <div className={s.titleWrapper}>
                <div className={s.title}>
                    <h3>Delete Pack</h3>
                </div>
                <div className={s.image} onClick={closeHandler}>
                    <img src={close} alt="close icon"/>
                </div>
            </div>

            <div className={s.message}>
                <p>
                    Do you really want to remove Pack Name?
                    All cards will be deleted.
                </p>
            </div>

            <div className={s.btnWrapper}>
                <div className={s.btn}>
                    <Button name={'Cancel'} variant={'transparent'} handler={closeHandler}/>
                </div>
                <div className={s.btn}>
                    <Button name={'Delete'} variant={'danger'} handler={deletePackHandler}/>
                </div>
            </div>

        </ModalOverlay>
    );
};

export default DeletePackModal;