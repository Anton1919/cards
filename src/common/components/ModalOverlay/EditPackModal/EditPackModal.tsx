import React, {ChangeEvent, useState} from 'react';
import s from './EditPackModal.module.scss'
import ModalOverlay from "common/components/ModalOverlay/ModalOverlay";
import close from "assets/icons/close.svg";
import Button from "common/components/Button/Button";
import {PackType} from "features/packs/api/packsAPI";
import {useAppDispatch} from "app/store";
import {updatePack} from "features/packs/packsReducer";

type EditPackModalType = {
    packs: PackType
    isOpen: boolean
    onClose: (value: boolean) => void
}

const EditPackModal = ({packs, isOpen, onClose}: EditPackModalType) => {
    const [editMode, setEditMode] = useState(false)
    const [privateStatus, setPrivateStatus] = useState(false)
    const [packName, setPackName] = useState(packs.name)
    const dispatch = useAppDispatch();

    const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.currentTarget.value);
    };

    const changePrivateHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPrivateStatus(e.currentTarget.checked)
    }

    const editModeHandler = () => {
        setEditMode(!editMode)
    }

    const closeModalHandler = () => {
        onClose(false)
    }

    const saveHandler = () => {
        onClose(false)
        dispatch(updatePack({cardsPack: {name: packName, _id: packs._id, private: privateStatus, deckCover: ''}}))
    }

    return (
        <ModalOverlay isOpen={isOpen} onClose={closeModalHandler}>
            <div className={s.titleWrapper}>
                <div className={s.title}>
                    <h3>Edit Pack</h3>
                </div>
                <div className={s.image} onClick={closeModalHandler}>
                    <img src={close} alt="close icon"/>
                </div>
            </div>

            <div className={s.changeName}>
                <span className={s.placeholder}>Name Pack</span>
                {editMode
                    ? <input className={s.inputChangeName}
                             type="text"
                             onBlur={editModeHandler}
                             autoFocus
                             value={packName}
                             onChange={changeNameHandler}
                    />
                    : <p className={s.name} onClick={editModeHandler}>{packName}</p>}
            </div>

            <div className={s.private}>
                <input type="checkbox" checked={privateStatus} onChange={changePrivateHandler}/>
                <span>Private Pack</span>
            </div>

            <div className={s.btnWrapper}>
                <div className={s.btn}>
                    <Button name={'Cancel'} variant={'transparent'} handler={closeModalHandler}/>
                </div>

                <div className={s.btn}>
                    <Button name={'Save'} variant={'primary'} handler={saveHandler}/>
                </div>

            </div>

        </ModalOverlay>
    );
};

export default EditPackModal;