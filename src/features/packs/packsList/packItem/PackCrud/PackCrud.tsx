import React, { memo, useCallback } from 'react';
import s from './PackCrud.module.scss';

import learn from '../../../../../assets/icons/learn.svg';
import deleteIcon from '../../../../../assets/icons/Delete.svg';
import edit from '../../../../../assets/icons/edit.svg';
import { useAppDispatch, useAppSelector } from '../../../../../app/store';
import { deletePack } from '../../../packsReducer';
import {selectIdForPackCrud} from "../../../selectors/selectors";

type PackCrudType = {
  usersID: string;
  packId: string;
};

const PackCrud = ({ usersID, packId }: PackCrudType) => {
  const id = useAppSelector(selectIdForPackCrud);
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
