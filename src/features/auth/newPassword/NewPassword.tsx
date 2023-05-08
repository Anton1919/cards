import React from 'react';
import Card from 'common/components/Card/Card';
import s from './NewPassword..module.scss';
import Button from 'common/components/Button/Button';
import PasswordInput from 'common/components/Input/PasswordInput/PasswordInput';
import {useNewPasswordValid} from '../hooks/useNewPassValiv';
import {Navigate, NavLink, useParams} from 'react-router-dom';
import {useAppSelector} from 'app/store';
import {PATHS} from 'common/routes/PATHS';
import {selectForgotStatus, selectStatus} from 'common/selectors/selectors';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from "@mui/material/LinearProgress";

const NewPassword = () => {
    const {token} = useParams();
    const forgotStatus = useAppSelector(selectForgotStatus);
    const {handleSubmit, passwordRules, onSubmit, register, errors, load} = useNewPasswordValid(token);
    const status = useAppSelector(selectStatus)

    if (forgotStatus) {
        return <Navigate to={PATHS.login}/>;
    }

    if (status === 'loading') {
        return <LinearProgress/>
    }

    return (
        <Card title={'Create new password'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={s.password}>
                    <PasswordInput
                        label={'Password'}
                        name={'password'}
                        rules={passwordRules}
                        register={register}
                        error={errors.password?.message}
                    />
                </div>
                <div className={s.placeholder}>
                    <span>Create new password and we will send you further instructions to email</span>
                </div>
                <div className={s.btn}>{load ? <CircularProgress size={30}/> :
                    <Button name={'Create new password'}/>}</div>
                <div className={s.backToLogin}>
                    <NavLink to={PATHS.login}>Back to login</NavLink>
                </div>
            </form>
        </Card>
    );
};

export default NewPassword;
