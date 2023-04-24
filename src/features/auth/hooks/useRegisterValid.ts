import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../app/store';
import { signUp } from '../authReducer/authReducer';
import { useState } from 'react';

export type RegisterFormValid = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export const useRegisterValid = () => {
  const [load, setLoad] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterFormValid>({ mode: 'all' });

  const onSubmit = async (data: RegisterFormValid) => {
    setLoad(true);
    const { email, password } = data;
    await dispatch(signUp({ email, password }));
    setLoad(false);
  };

  const emailPattern = {
    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gi,
    // /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/gi,
    message: 'Enter a valid email address.',
  };

  const emailRules = { required: 'You must enter your email.', pattern: emailPattern };

  const passwordRules = {
    required: 'You must enter your password',
    minLength: { value: 7, message: 'Field must be more than 7 characters' },
  };

  const cPasswordRules = {
    required: 'You must enter your password.',
    validate: (value: string) => {
      const { password } = getValues();
      return password === value || 'The password must match the new password!';
    },
  };

  return { onSubmit, emailRules, passwordRules, handleSubmit, register, errors, cPasswordRules, load };
};
