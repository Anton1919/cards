import React, {ChangeEvent, useState} from 'react';
import ModalOverlay from "common/components/ModalOverlay/ModalOverlay";
import s from "common/components/ModalOverlay/AddNewPackModal/AddNewPackModal.module.scss";
import close from "assets/icons/close.svg";
import FieldError from "common/components/FieldError/FieldError";
import Button from "common/components/Button/Button";

type PropsType = {
    packName: string
    title: string
    isOpen: boolean
    onClose: (value: boolean) => void
    thunkCreator: () => void
    setPackName: (value: string) => void
    setPrivateStatus: (value: boolean) => void
    privateStatus: boolean
}

const BasePackModal = ({
                           title,
                           isOpen,
                           onClose,
                           packName,
                           privateStatus,
                           thunkCreator,
                           setPackName,
                           setPrivateStatus
                       }: PropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [error, setError] = useState('')

    const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setPackName(e.currentTarget.value);
    };

    const changePrivateHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPrivateStatus(e.currentTarget.checked)
    }

    const editModeHandler = () => {
        if (packName === '') {
            setError('Field is required')
            return
        }
        setEditMode(!editMode)
    }

    const closeModalHandler = () => {
        onClose(false)
    }

    const saveHandler = () => {
        onClose(false)
        thunkCreator()
    }

    return (
        <ModalOverlay isOpen={isOpen} onClose={closeModalHandler}>
            <div className={s.titleWrapper}>
                <div className={s.title}>
                    <h3>{title}</h3>
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
                {error && <FieldError errorMessage={error}/>}
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
                    <Button name={'Save'} variant={'primary'} handler={saveHandler} disabled={!!error}/>
                </div>
            </div>

        </ModalOverlay>
    );
};

export default BasePackModal;