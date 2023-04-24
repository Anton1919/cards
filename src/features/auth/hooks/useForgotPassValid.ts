import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../app/store';
import { forgotPassword } from '../forgot-password/fogotPasswordReducer';
import { useState } from 'react';

export type ForgotField = {
  email: string;
};

export const useForgotPasswordValid = () => {
  const [load, setLoad] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotField>({ mode: 'all' });

  const onSubmit = async ({ email }: ForgotField) => {
    setLoad(true);
    await dispatch(forgotPassword(email));
    setLoad(false);
  };

  const emailRules = { required: 'You must enter your Email' };

  return { onSubmit, emailRules, handleSubmit, register, isValid, errors, load };
};
