import React from 'react';
import s from './Checkbox.module.scss';

type CheckboxPropsType = {
  checked: boolean;
};

const Checkbox = ({ checked }: CheckboxPropsType) => {
  return <input className={s.checkBox} type={'checkbox'} checked={checked} />;
};

export default Checkbox;
