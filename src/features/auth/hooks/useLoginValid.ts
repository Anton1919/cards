import { useForm } from 'react-hook-form';
import { logIn } from '../authReducer/authReducer';
import { useAppDispatch } from '../../../app/store';
import { useState } from 'react';

export type LoginDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const useLoginValid = () => {
  const dispatch = useAppDispatch();
  const [load, setLoad] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginDataType>({ mode: 'onChange' });

  const onSubmit = async (data: LoginDataType) => {
    setLoad(true);
    await dispatch(logIn(data));
    setLoad(false);
  };
  const passwordRules = {
    required: 'You must enter your password',
    minLength: { value: 7, message: 'Field must be more than 7 characters' },
  };

  const emailRules = { required: 'You must enter your Email' };

  return { onSubmit, emailRules, handleSubmit, register, isValid, passwordRules, errors, load };
};
