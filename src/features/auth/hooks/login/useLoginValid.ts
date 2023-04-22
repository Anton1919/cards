import { useForm } from 'react-hook-form';
import { me } from '../../authReducer/authReducer';

export type LoginDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const useLoginValid = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginDataType>({ mode: 'all' });

  const onSubmit = (data: LoginDataType) => {
    alert(JSON.stringify(data));
  };

  const passwordRules = {
    required: 'You must enter your password',
    minLength: { value: 3, message: 'Field must be more than 3 characters' },
  };

  const emailRules = { required: 'You must enter your Email' };

  return { onSubmit, emailRules, handleSubmit, register, isValid, passwordRules, errors };
};
