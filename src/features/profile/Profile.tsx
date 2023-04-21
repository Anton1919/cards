import React from 'react';
import s from './Profile.module.scss';
import Card from '../../common/components/Card/Card';
import check from '../../assets/image/check.png';
import Button from '../../common/components/Button/Button';
import EditableSpan from './EditableSpan/EditableSpan';

const Profile = () => {
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
        <Button name={'Log out'} variant={'transparent'} />
      </div>
    </Card>
  );
};

export default Profile;
