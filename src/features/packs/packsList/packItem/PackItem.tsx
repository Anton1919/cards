import React from 'react';
import s from './PackItem.module.scss';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import { PackType } from '../../api/packsAPI';
import { convertDate } from '../../../../utils/time';

type PacksType = {
  packs: PackType;
};

const PackItem = ({ packs }: PacksType) => {
  const date = convertDate(packs.updated);

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell className={s.packName} component='th' scope='row'>
        <Link style={{ wordBreak: 'break-word' }} to={'/'}>
          {packs.name}
        </Link>
      </TableCell>
      <TableCell align='right'>
        {/*<Picture deckCover={pack.deckCover} defaultCover={defaultCover} />*/}
        Картинка
      </TableCell>
      <TableCell align='right'>{packs.cardsCount}</TableCell>
      <TableCell align='right'>{date}</TableCell>
      <TableCell align='right'>{packs.user_name}</TableCell>
      <TableCell align='right'>
        Pack crud
        {/*<PackListCrud*/}
        {/*  id={pack._id}*/}
        {/*  cardsCount={pack.cardsCount}*/}
        {/*  userId={pack.user_id}*/}
        {/*  educationsAction={() => {}}*/}
        {/*  packName={pack.name}*/}
        {/*  deckCover={pack.deckCover}*/}
        {/*  editAction={updatePack}*/}
        {/*  deleteAction={deletePack}*/}
        {/*/>*/}
      </TableCell>
    </TableRow>
  );
};

export default PackItem;
