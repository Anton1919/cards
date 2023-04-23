import React from 'react';
import Card from '../../../common/components/Card/Card';
import s from './NewPassword..module.scss';
import Button from '../../../common/components/Button/Button';
import PasswordInput from '../../../common/components/Input/PasswordInput/PasswordInput';
import { useNewPasswordValid } from '../hooks/useNewPassValiv';
import { Navigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/store';
import { PATHS } from '../../../common/routes/PATHS';

const NewPassword = () => {
  const { token } = useParams();
  const forgotStatus = useAppSelector((state) => state.forgot.forgotStatus);
  console.log('New password', forgotStatus);
  const { handleSubmit, passwordRules, onSubmit, register, errors } = useNewPasswordValid(token);

  if (forgotStatus) {
    return <Navigate to={PATHS.login} />;
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
        <div className={s.btn}>
          <Button name={'Create new password'} />
        </div>
      </form>
    </Card>
  );
};

export default NewPassword;
