import React, {useEffect} from 'react';
import s from './Error404.module.scss'
import Button from "common/components/Button/Button";
import errorImg from 'assets/image/404.png'
import {useNavigate} from "react-router-dom";
import {PATHS} from "common/routes/PATHS";
import {useAppDispatch, useAppSelector} from "app/store";
import {setAppError, setError404} from "app/appReducer";

const Error404 = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setError404({error: '404'}))
    }, [])

    const clickHandler = () => {
        dispatch(setError404({error: null}))
        navigate(PATHS.profile)
    }

    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <div className={s.description}>
                    <h2 className={s.title}>Ooops!</h2>
                    <p className={s.text}>Sorry! Page not found!</p>
                    <div className={s.btn}>
                        <Button name={'Back to home page'} variant={'primary'} handler={clickHandler}/>
                    </div>
                </div>

                <div className={s.image}>
                    <img src={errorImg} alt="404"/>
                </div>
            </div>
        </div>
    );
};

export default Error404;