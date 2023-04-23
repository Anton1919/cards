import React from 'react';
import Card from '../../../common/components/Card/Card';
import BaseInput from '../../../common/components/Input/BaseInput/BaseInput';
import s from './ForgotPassword.module.scss';
import Button from '../../../common/components/Button/Button';
import { Navigate, NavLink } from 'react-router-dom';
import { useForgotPasswordValid } from '../hooks/useForgotPassValid';
import { useAppSelector } from '../../../app/store';
import { PATHS } from '../../../common/routes/PATHS';

const ForgotPassword = () => {
  const { handleSubmit, emailRules, onSubmit, register, errors } = useForgotPasswordValid();

  const forgot = useAppSelector((state) => state.forgot.forgotStatus);
  console.log('Forgot password', forgot);
  if (forgot) {
    return <Navigate to={PATHS.checkEmail} />;
  }

  return (
    <Card title={'Forgot your password?'}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginTop: '30px', width: '100%' }}>
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
        <div className={s.btn}>
          <Button name={'Send Instructions'} />
        </div>
        <div className={s.comeBack}>
          <span>Did you remember your password?</span>
          <NavLink to={'/login'}>Try logging in</NavLink>
        </div>
      </form>
    </Card>
  );
};

export default ForgotPassword;
