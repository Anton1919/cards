import React from 'react';
import Card from '../../../common/components/Card/Card';
import s from './SignIn.module.scss';
import Button from '../../../common/components/Button/Button';
import BaseInput from '../../../common/components/Input/BaseInput/BaseInput';
import { Navigate, NavLink } from 'react-router-dom';
import { PATHS } from '../../../common/routes/PATHS';
import { useLoginValid } from '../hooks/useLoginValid';
import PasswordInput from '../../../common/components/Input/PasswordInput/PasswordInput';
import CheckboxInput from '../../../common/components/Input/CheckBoxInput/CheckboxInput';
import { useAppSelector } from '../../../app/store';
import { selectIsLoggedIn } from '../../../common/selectors/selectors';
import CircularProgress from '@mui/material/CircularProgress';

const SignIn = () => {
  const { handleSubmit, emailRules, onSubmit, register, isValid, errors, passwordRules, load } = useLoginValid();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <Navigate to={PATHS.profile} />;
  }

  return (
    <Card title={'Sign In'}>
      <form className={s.login} onSubmit={handleSubmit(onSubmit)}>
        <BaseInput
          register={register}
          error={errors.email?.message}
          label={'Email'}
          type={'email'}
          name={'email'}
          rules={emailRules}
        />
        <PasswordInput
          label={'Password'}
          name={'password'}
          rules={passwordRules}
          register={register}
          error={errors.password?.message}
        />
        <CheckboxInput register={register} name={'rememberMe'} label={'Remember me'} />

        <div className={s.forgotPassword}>
          <NavLink to={PATHS.recovery}>Forgot Password?</NavLink>
        </div>
        <div className={s.btnWrapper}>
          {load ? <CircularProgress size={30} /> : <Button name={'Sign In'} disabled={!isValid} />}
        </div>
        <div className={s.signUp}>
          <span>Already have an account?</span>
          <NavLink to={PATHS.register}>Sign Up</NavLink>
        </div>
      </form>
    </Card>
  );
};

export default SignIn;
