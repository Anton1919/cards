import React from 'react';
import s from './Profile.module.scss';
import Card from '../../common/components/Card/Card';
import check from '../../assets/image/check.png';
import Button from '../../common/components/Button/Button';
import EditableSpan from './EditableSpan/EditableSpan';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { Navigate } from 'react-router-dom';
import { PATHS } from '../../common/routes/PATHS';
import { logout } from '../auth/authReducer/authReducer';
import { selectIsLoggedIn } from '../../common/selectors/selectors';

const Profile = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  if (!isLoggedIn) {
    return <Navigate to={PATHS.login} />;
  }

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <Card title={'Personal Information'}>
      <div className={s.image}>
        <label>
          <img src={check} alt='logo' />
          <input type='file' style={{ display: 'none' }} />
        </label>
      </div>

      <div className={s.nickname}>
        <EditableSpan />
      </div>

      <div className={s.emailDescription}>
        <span>j&johnson@gmail.com</span>
      </div>

      <div className={s.btn}>
        <Button name={'Log out'} variant={'transparent'} handler={handleLogOut} />
      </div>
    </Card>
  );
};

export default Profile;
