import React from 'react';
import Card from 'common/components/Card/Card';
import s from './CheckEmail.module.scss';
import Button from 'common/components/Button/Button';
import check from 'assets/image/check.png';
import {NavLink} from 'react-router-dom';
import {PATHS} from 'common/routes/PATHS';
import {useAppSelector} from "app/store";
import {selectStatus} from "common/selectors/selectors";
import {LinearProgress} from "@mui/material";

const CheckEmail = () => {
    const status = useAppSelector(selectStatus)

    if (status === 'loading') {
        return <LinearProgress/>
    }

    return (
        <Card title={'Check Email'}>
            <div className={s.image}>
                <img src={check} alt='img'/>
            </div>
            <div className={s.placeholder}>
                <span>We’ve sent an Email with instructions to example@mail.com</span>
            </div>
            <div className={s.btn}>
                <NavLink to={PATHS.login} style={{textDecoration: 'none'}}>
                    <Button name={'Back to login'}/>
                </NavLink>
            </div>
        </Card>
    );
};

export default CheckEmail;
