import React from 'react';
import Card from '../../../common/components/Card/Card';
import s from './Login.module.scss';
import Button from '../../../common/components/Button/Button';
import Input from '../../../common/components/Input/Input';
import Checkbox from '../../../common/components/Checkbox/Checkbox';

const Login = ({}) => {
  return (
    <Card title={'Sign in'}>
      <form className={s.login}>
        <Input label={'Email'} type={'email'} name={'email'} />
        <Input label={'Password'} type={'password'} name={'password'} />
        <div className={s.rememberMe}>
          <Checkbox checked={true} />
          <span>Remember me</span>
        </div>
        <div className={s.forgotPassword}>
          <a href=''>Forgot Password?</a>
        </div>

        <div className={s.btnWrapper}>
          <Button name={'Sign in'} />
        </div>

        <div className={s.signUp}>
          <span>Already have an account?</span>
          <a href=''>Sign Up</a>
        </div>
      </form>
    </Card>
  );
};

export default Login;
