import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../app/store';
import { newPassword } from '../forgot-password/fogotPasswordReducer';

type FieldNewPass = {
  password: string;
};

export const useNewPasswordValid = (token: string | undefined) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FieldNewPass>({ mode: 'all' });

  const onSubmit = ({ password }: FieldNewPass) => {
    if (token) {
      dispatch(newPassword({ password: password, resetPasswordToken: token }));
    }
  };

  const passwordRules = {
    required: 'You must enter your password',
    minLength: { value: 7, message: 'Field must be more than 3 characters' },
  };

  return { onSubmit, passwordRules, handleSubmit, register, isValid, errors };
};
