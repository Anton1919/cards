import React, { ReactNode } from 'react';
import s from './Header.module.scss';
import label from '../../../assets/image/header.png';

type HeaderPropsType = {
  children: ReactNode;
};

const Header = ({ children }: HeaderPropsType) => {
  return (
    <header className={s.header}>
      <img className={s.image} src={label} alt='label' />
      <div className={s.account}>{children}</div>
    </header>
  );
};

export default Header;
