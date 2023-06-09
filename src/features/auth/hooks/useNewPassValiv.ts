import { useForm } from 'react-hook-form';
import { useAppDispatch } from 'app/store';
import { newPassword } from '../forgot-password/fogotPasswordReducer';
import { useState } from 'react';

type FieldNewPass = {
  password: string;
};

export const useNewPasswordValid = (token: string | undefined) => {
  const [load, setLoad] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FieldNewPass>({ mode: 'all' });

  const onSubmit = async ({ password }: FieldNewPass) => {
    if (token) {
      setLoad(true);
      await dispatch(newPassword({ password: password, resetPasswordToken: token }));
      setLoad(false);
    }
  };

  const passwordRules = {
    required: 'You must enter your password',
    minLength: { value: 7, message: 'Field must be more than 7 characters' },
  };

  return { onSubmit, passwordRules, handleSubmit, register, isValid, errors, load };
};
