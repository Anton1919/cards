import React from 'react';
import Card from 'common/components/Card/Card';
import s from './SignUp.module.scss';
import Button from 'common/components/Button/Button';
import BaseInput from 'common/components/Input/BaseInput/BaseInput';
import {Navigate, NavLink} from 'react-router-dom';
import {PATHS} from 'common/routes/PATHS';
import {useRegisterValid} from "features/auth/hooks/useRegisterValid";
import PasswordInput from 'common/components/Input/PasswordInput/PasswordInput';
import {useAppSelector} from 'app/store';
import {selectSignUp, selectStatus} from 'common/selectors/selectors';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from "@mui/material/LinearProgress";

const SignUp = () => {
    const {handleSubmit, emailRules, passwordRules, onSubmit, register, errors, cPasswordRules, load} =
        useRegisterValid();
    const signUp = useAppSelector(selectSignUp);
    const status = useAppSelector(selectStatus)

    if (signUp) {
        return <Navigate to={PATHS.login}/>;
    }

    if (status === 'loading') {
        return <LinearProgress/>
    }
    return (
        <Card title={'Sign Up'}>
            <form className={s.login} onSubmit={handleSubmit(onSubmit)}>
                <BaseInput
                    rules={emailRules}
                    label={'Email'}
                    type={'email'}
                    name={'email'}
                    register={register}
                    error={errors.email?.message}
                />
                <PasswordInput
                    label={'Password'}
                    name={'password'}
                    rules={passwordRules}
                    register={register}
                    error={errors.password?.message}
                />
                <PasswordInput
                    label={'Confirm password'}
                    name={'confirmPassword'}
                    rules={cPasswordRules}
                    register={register}
                    error={errors.confirmPassword?.message}
                />
                <div className={s.btnWrapper}>{load ? <CircularProgress size={30}/> : <Button name={'Sign Up'}/>}</div>
                <div className={s.signIn}>
                    <span>Already have an account?</span>
                    <NavLink to={PATHS.login}>Sign In</NavLink>
                </div>
            </form>
        </Card>
    );
};

export default SignUp;
