import React from 'react';
import s from './FieldError.module.scss'

type PropsType = {
    errorMessage: string
}

const FieldError = ({errorMessage}: PropsType) => {
    return (
        <div className={s.error}>
            <p className={s.text}>{errorMessage}</p>
        </div>
    );
};

export default FieldError;