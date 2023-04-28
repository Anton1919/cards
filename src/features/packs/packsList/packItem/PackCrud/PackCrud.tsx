import React, { memo, useCallback } from 'react';
import s from './PackCrud.module.scss';

import learn from '../../../../../assets/icons/learn.svg';
import deleteIcon from '../../../../../assets/icons/Delete.svg';
import edit from '../../../../../assets/icons/edit.svg';
import { useAppDispatch, useAppSelector } from '../../../../../app/store';
import { deletePack } from '../../../packsReducer';

type PackCrudType = {
  usersID: string;
  packId: string;
};

const PackCrud = ({ usersID, packId }: PackCrudType) => {
  console.log('PackCrud render');
  const id = useAppSelector((state) => state.profile._id);
  const dispatch = useAppDispatch();

  const deletePackHandler = () => {
    dispatch(deletePack(packId));
  };

  return (
    <div className={s.container}>
      <div className={s.icon}>
        <img src={learn} alt={'learn icon'} />
      </div>

      {usersID === id && (
        <div className={s.icon}>
          <img src={edit} alt={'edit icon'} />
        </div>
      )}
      {usersID === id && (
        <div className={s.icon} onClick={deletePackHandler}>
          <img src={deleteIcon} alt={'delete icon'} />
        </div>
      )}
    </div>
  );
};

export default PackCrud;
