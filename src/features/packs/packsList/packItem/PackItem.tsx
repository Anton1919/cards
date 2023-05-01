import React, { memo } from 'react';
import s from './PackItem.module.scss';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import { PackType } from '../../api/packsAPI';
import { convertDate } from '../../../../utils/time';
import PackCrud from './PackCrud/PackCrud';

type PacksType = {
  packs: PackType;
};

const PackItem = ({ packs }: PacksType) => {
  const date = convertDate(packs.updated);

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell className={s.packName} component='th' scope='row'>
        <Link style={{ wordBreak: 'break-word' }} to={packs._id}>
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
        <PackCrud usersID={packs.user_id} packId={packs._id} />
      </TableCell>
    </TableRow>
  );
};

export default PackItem;
