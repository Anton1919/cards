import React from 'react';
import s from './Button.module.scss';

type ButtonPropsType = {
  name: string;
  variant?: 'primary' | 'transparent' | 'danger';
  handler?: () => void;
  disabled?: boolean;
};

const Button = ({ name, disabled, handler, variant = 'primary' }: ButtonPropsType) => {
  let buttonStyle = s.primary;

  switch (variant) {
    case 'transparent':
      buttonStyle = s.transparent;
      break;
    case 'danger':
      buttonStyle = s.danger;
      break;
    default:
      buttonStyle = s.primary;
  }

  return (
    <button className={buttonStyle} onClick={handler} disabled={disabled}>
      {name}
    </button>
  );
};

export default Button;
