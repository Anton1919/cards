import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './EditableSpan.module.scss';
import editImg from 'assets/icons/edit.svg';
import {useAppDispatch} from "app/store";
import {setProfileName} from "features/profile/Profile/profileReducer";

type EditableTtype = {
    name: string | undefined;
};

const EditableSpan = ({name}: EditableTtype) => {
    const [text, setText] = useState(name);
    const [edit, setEdit] = useState(false);
    const dispatch = useAppDispatch()

    const editModeHandler = () => {
        setEdit(!edit);
    };

    useEffect(() => {
        if (text) {
            dispatch(setProfileName({profileName: text}))
        }
    }, [text])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value);
    };

    const onSaveHandler = () => {
        setText(text);
    };

    return (
        <>
            {edit ? (
                <div className={s.container}>
                    <label className={s.label}>Nickname </label>
                    <div className={s.inputWrapper}>
                        <input value={text} type='text' onChange={onChangeHandler} autoFocus onBlur={editModeHandler}/>
                        <button className={s.btn} onClick={onSaveHandler}>
                            SAVE
                        </button>
                    </div>
                </div>
            ) : (
                <div className={s.textWrapper}>
                    <div className={s.text} onDoubleClick={editModeHandler}>
                        {text ? text : 'Click to change yor name'}
                    </div>
                    <img src={editImg} alt='edit' onClick={editModeHandler}/>
                </div>
            )}
        </>
    );
};

export default EditableSpan;
