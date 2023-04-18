import React from 'react';
import s from './Input.module.scss';
import eye from '../../../assets/icons/eye.png';

type InputPropsType = {
  label: string;
  type: string;
  name: string;
};

const Input = ({ label, type, name }: InputPropsType) => {
  return (
    <label className={s.label}>
      {label && <span className={s.labelText}>{label}</span>}
      {type === 'password' ? (
        <>
          <input name={name} type={type} className={s.input} />
          <img className={s.icon} src={eye} alt='icon' />
        </>
      ) : (
        <input name={name} type={type} className={s.input} />
      )}
    </label>
  );
};

export default Input;
