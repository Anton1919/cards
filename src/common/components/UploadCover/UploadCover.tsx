import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './UploadCover.module.scss'

import uploadIcon from 'assets/icons/camera.svg'
import {onUpload} from "utils/uploadImage";
import {useAppDispatch} from "app/store";

type PropsType = {
    setDeckCover: (value: string) => void
    coverPicture: string
}

const UploadCover = ({setDeckCover, coverPicture}: PropsType) => {
    const [picture, setPicture] = useState('')
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (picture) {
            setDeckCover(picture)
        }
    }, [picture])

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onUpload(e, setPicture, dispatch)
    }

    return (
        <div className={s.uploadContainer}>
            <div className={s.uploadPlaceholder}>
                <p className={s.text}>Upload your picture</p>
                <label>
                    <input type="file" style={{display: 'none'}} onChange={uploadHandler}/>
                    <img src={uploadIcon} alt="uploadIcon"/>
                </label>
            </div>
            <div className={s.uploadImg}>
                <img src={picture ? picture : coverPicture} alt="deck cover"/>
            </div>
        </div>
    );
};

export default UploadCover;