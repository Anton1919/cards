import { useForm } from 'react-hook-form';

export type RegisterFormValid = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export const useRegisterValid = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterFormValid>({ mode: 'all' });

  const onSubmit = (data: RegisterFormValid): void => {
    const { email, password } = data;
    alert(JSON.stringify({ email, password }));
  };

  const emailPattern = {
    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gi,
    // /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/gi,
    message: 'Enter a valid email address.',
  };

  const emailRules = { required: 'You must enter your email.', pattern: emailPattern };

  const passwordRules = {
    required: 'You must enter your password',
    minLength: { value: 3, message: 'Field must be more than 3 characters' },
  };

  const cPasswordRules = {
    required: 'You must enter your password.',
    validate: (value: string) => {
      const { password } = getValues();
      return password === value || 'The password must match the new password!';
    },
  };

  return { onSubmit, emailRules, passwordRules, handleSubmit, register, errors, cPasswordRules };
};
