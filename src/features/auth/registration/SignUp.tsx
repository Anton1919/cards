import React from 'react';
import Card from '../../../common/components/Card/Card';
import s from './SignUp.module.scss';
import Button from '../../../common/components/Button/Button';
import BaseInput from '../../../common/components/Input/BaseInput/BaseInput';
import { NavLink } from 'react-router-dom';
import { PATHS } from '../../../common/routes/PATHS';
import { useRegisterValid } from '../hooks/register/useRegisterValid';
import PasswordInput from '../../../common/components/Input/PasswordInput/PasswordInput';

const SignUp = () => {
  const { handleSubmit, emailRules, passwordRules, onSubmit, register, errors, cPasswordRules } = useRegisterValid();

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
        <div className={s.btnWrapper}>
          <Button name={'Sign Up'} />
        </div>
        <div className={s.signIn}>
          <span>Already have an account?</span>
          <NavLink to={PATHS.login}>Sign In</NavLink>
        </div>
      </form>
    </Card>
  );
};

export default SignUp;
