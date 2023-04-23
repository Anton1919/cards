import { useForm } from 'react-hook-form';
import { logIn } from '../authReducer/authReducer';
import { useAppDispatch } from '../../../app/store';

export type LoginDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const useLoginValid = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginDataType>({ mode: 'all' });

  const onSubmit = (data: LoginDataType) => {
    dispatch(logIn(data));
  };
  const passwordRules = {
    required: 'You must enter your password',
    minLength: { value: 7, message: 'Field must be more than 7 characters' },
  };

  const emailRules = { required: 'You must enter your Email' };

  return { onSubmit, emailRules, handleSubmit, register, isValid, passwordRules, errors };
};
