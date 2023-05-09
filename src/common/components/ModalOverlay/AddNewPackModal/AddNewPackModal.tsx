import React, {ChangeEvent, useState} from 'react';
import ModalOverlay from "common/components/ModalOverlay/ModalOverlay";
import s from './AddNewPackModal.module.scss'
import close from 'assets/icons/close.svg'
import Button from "common/components/Button/Button";
import {addPackTC} from "features/packs/packsReducer";
import {useAppDispatch} from "app/store";

type AddPackModalType = {
    isOpen: boolean
    onClose: () => void
}

const AddNewPackModal = ({isOpen, onClose}: AddPackModalType) => {
    const [editMode, setEditMode] = useState(false)
    const [packName, setPackName] = useState('enter pack name');
    const [privateStatus, setPrivateStatus] = useState(false)
    const dispatch = useAppDispatch();

    const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.currentTarget.value);
    };

    const editModeHandler = () => {
        setEditMode(!editMode)
    }

    const changePrivateHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPrivateStatus(e.currentTarget.checked)
    }

    const onSaveHandler = () => {
        onClose()
        dispatch(addPackTC({cardsPack: {name: packName, private: privateStatus, deckCover: ''}}));
    }

    return (
        <ModalOverlay isOpen={isOpen} onClose={onClose}>
            <div className={s.titleWrapper}>
                <div className={s.title}>
                    <h3>Add new Pack</h3>
                </div>
                <div className={s.image} onClick={onClose}>
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
                    <Button name={'Cancel'} variant={'transparent'} handler={onClose}/>
                </div>

                <div className={s.btn}>
                    <Button name={'Save'} variant={'primary'} handler={onSaveHandler}/>
                </div>

            </div>

        </ModalOverlay>
    );
};

export default AddNewPackModal;