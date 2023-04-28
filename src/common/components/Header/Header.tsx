import React from 'react';
import s from './Header.module.scss';
import label from '../../../assets/image/header.png';
import Button from '../Button/Button';
import { useAppSelector } from '../../../app/store';
import { selectIsLoggedIn } from '../../selectors/selectors';
import Account from '../../../features/profile/Account/Account';
import { Navigate, useNavigate } from 'react-router-dom';
import { PATHS } from '../../routes/PATHS';

const Header = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const onHandler = () => {
    navigate(PATHS.login);
  };

  return (
    <header className={s.header}>
      <img className={s.image} src={label} alt='label' />
      <div className={s.account}>{isLoggedIn ? <Account /> : <Button name={'Sign In'} handler={onHandler} />}</div>
    </header>
  );
};

export default Header;
