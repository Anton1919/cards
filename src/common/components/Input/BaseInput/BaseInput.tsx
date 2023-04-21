import React from 'react';
import s from './BaseInput.module.scss';
import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

export type InputPropsType<TFormValues extends FieldValues> = {
  label: string;
  type?: string;
  name: Path<TFormValues>;
  register?: UseFormRegister<TFormValues>;
  rules?: RegisterOptions;
  error?: any;
};

const BaseInput = <TFormValues extends Record<string, unknown>>({
  register,
  label,
  error,
  type,
  name,
  rules,
}: InputPropsType<TFormValues>) => {
  return (
    <label className={s.label}>
      {label && <span className={s.labelText}>{label}</span>}
      <input {...(register && register(name, rules))} name={name} type={type} className={s.input} />
      {error && <div className={s.errorText}>{error || 'Error'}</div>}
    </label>
  );
};

export default BaseInput;
