import React from 'react';
import Card from 'common/components/Card/Card';
import BaseInput from 'common/components/Input/BaseInput/BaseInput';
import s from './ForgotPassword.module.scss';
import Button from 'common/components/Button/Button';
import {Navigate, NavLink} from 'react-router-dom';
import {useForgotPasswordValid} from "features/auth/hooks/useForgotPassValid";
import {useAppSelector} from 'app/store';
import {PATHS} from 'common/routes/PATHS';
import {selectForgotStatus, selectStatus} from 'common/selectors/selectors';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from "@mui/material/LinearProgress";

const ForgotPassword = () => {
    const {handleSubmit, emailRules, onSubmit, register, errors, load} = useForgotPasswordValid();
    const forgot = useAppSelector(selectForgotStatus);
    const status = useAppSelector(selectStatus)

    if (forgot) {
        return <Navigate to={PATHS.checkEmail}/>;
    }

    if (status === 'loading') {
        return <LinearProgress/>
    }

    return (
        <Card title={'Forgot your password?'}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <div style={{marginTop: '30px', width: '100%'}}>
                    <BaseInput
                        register={register}
                        error={errors.email?.message}
                        label={'Email'}
                        type={'email'}
                        name={'email'}
                        rules={emailRules}
                    />
                </div>
                <div className={s.placeholder}>
                    <span>Enter your email address and we will send you further instructions </span>
                </div>
                <div className={s.btn}>{load ? <CircularProgress size={30}/> :
                    <Button name={'Send Instructions'}/>}</div>
                <div className={s.comeBack}>
                    <span>Did you remember your password?</span>
                    <NavLink to={'/login'}>Try logging in</NavLink>
                </div>
            </form>
        </Card>
    );
};

export default ForgotPassword;
