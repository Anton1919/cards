import React from 'react';
import Card from '../../../common/components/Card/Card';
import s from './NewPassword..module.scss';
import Button from '../../../common/components/Button/Button';
import { useLoginValid } from '../hooks/login/useLoginValid';
import PasswordInput from '../../../common/components/Input/PasswordInput/PasswordInput';

const NewPassword = () => {
  const { handleSubmit, passwordRules, onSubmit, register, errors } = useLoginValid();

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
