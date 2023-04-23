import React from 'react';
import Card from '../../../common/components/Card/Card';
import s from './NewPassword..module.scss';
import Button from '../../../common/components/Button/Button';
import PasswordInput from '../../../common/components/Input/PasswordInput/PasswordInput';
import { useNewPasswordValid } from '../hooks/useNewPassValiv';
import { useParams } from 'react-router-dom';

const NewPassword = () => {
  const { token } = useParams();

  console.log(token);

  const { handleSubmit, passwordRules, onSubmit, register, errors } = useNewPasswordValid(token);

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
