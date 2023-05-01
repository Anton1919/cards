import React from 'react';
import star from "../../../assets/icons/starEmpty.svg";
import s from './Grade.module.scss'


const Grade = () => {
    return (
        <>
            <div className={s.container}>
                <img src={star} alt="star"/>
            </div>
        </>

    );
};

export default Grade;