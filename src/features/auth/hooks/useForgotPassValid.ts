import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../app/store';
import { forgotPassword } from '../forgot-password/fogotPasswordReducer';

export type ForgotField = {
  email: string;
};

export const useForgotPasswordValid = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotField>({ mode: 'all' });

  const onSubmit = ({ email }: ForgotField) => {
    dispatch(forgotPassword(email));
  };

  const emailRules = { required: 'You must enter your Email' };

  return { onSubmit, emailRules, handleSubmit, register, isValid, errors };
};
