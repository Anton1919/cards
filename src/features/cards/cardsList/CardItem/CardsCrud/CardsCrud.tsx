import React from 'react';
import s from './CardsCrud.module.scss'
import edit from "assets/icons/edit.svg";
import deleteIcon from "assets/icons/Delete.svg";

const CardsCrud = () => {
    return (
        <div className={s.container}>
            <div className={s.icon}>
                <img src={edit} alt={'edit icon'}/>
            </div>
            <div className={s.icon}>
                <img src={deleteIcon} alt={'delete icon'}/>
            </div>
        </div>
    );
};

export default CardsCrud;